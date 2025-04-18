<script setup>
import { useLocalStorage, useSessionStorage } from '@vueuse/core'

definePageMeta({
  middleware: 'is-success',
})

const { customerId, paymentMethodId } = storeToRefs(useStripeStore())
const { stripe } = useClientStripe()
const { loadStripe } = useStripeStore()

const isLoading = ref(false)
const error = ref('')
const success = ref(false)
const route = useRoute()
const toast = useToast()
const router = useRouter()
/* const steps = [
  { id: 1, title: 'Upsell 1', amount: 100, buttonText: 'Add 500 EUR Package', next: 3 },
  { id: 2, title: 'Downsell 1', amount: 200, buttonText: 'Add 300 EUR Package', next: 3 },
  { id: 3, title: 'Upsell 2', amount: 300, buttonText: 'Add 700 EUR Package', next: 4 },
  { id: 4, title: 'Downsell 2', amount: 400, buttonText: 'Add 400 EUR Package', next: null },
] */
const steps = [
  {
    id: 1,
    title: '🎁 1. Startovní balíček radosti',
    description: `Každý začátek si zaslouží něco navíc. Přidej ke své objednávce dárkové balení s designovou krabičkou, samolepkou a malým překvapením uvnitř. Ideální, když to chceš dát jako dárek – nebo si jen udělat radost.`,
    ctaText: `Přidat balíček radosti za `,
    fomoText: 'Jen dnes! Platí pro prvních 20 objednávek.',
    amount: 629,
    discountedAmount: 387,
    imageUrl: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/23c7f214-e87f-49fd-bc6e-48b064713afa/segments/2:4:1/Flux_Schnell_create_a_beautiful_ceramic_cup_with_a_vibrant_cir_1.jpg',
    next: 2,
  },
  {
    id: 2,
    title: '👨‍👧 2. Dárek pro tátu nebo mámu?',
    description: `Nabízíme exkluzivní potisk na hrníček "Nejlepší táta na světě" nebo "Maminka roku". Perfektní jako milý dárek. Limitovaná edice – a skvěle se hodí k objednanému produktu.`,
    ctaText: 'Přidat hrníček za 199 Kč',
    amount: 199,
    imageUrl: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/23c7f214-e87f-49fd-bc6e-48b064713afa/segments/3:4:1/Flux_Schnell_create_a_beautiful_ceramic_cup_with_a_vibrant_cir_2.jpg',

    next: 3,
  },
  {
    id: 3,
    title: '👨‍👩‍👧 3. Rodinný pack: Dětský motiv + mini tričko',
    description: `Objednej si k tričku i dětskou verzi se stejným nebo ladícím motivem. Pro tvé dítě, neteř, synovce... Stylová rodinná fotka zaručena. 😄`,
    ctaText: 'Přidat mini tričko za 259 Kč',
    amount: 259,
    imageUrl: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/23c7f214-e87f-49fd-bc6e-48b064713afa/segments/2:4:1/Flux_Schnell_create_a_beautiful_ceramic_cup_with_a_vibrant_cir_1.jpg',

    next: 4,
  },
  {
    id: 4,
    title: '🌿 4. EKO sada péče a praní',
    description: `Chceš, aby tvé nové oblečení vydrželo? Přidáme ti přírodní EKO prací sáček a návod, jak se starat o potisk tak, aby nezmizel ani po 40 praních.`,
    ctaText: 'Přidat péči za 99 Kč',
    amount: 99,
    imageUrl: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/23c7f214-e87f-49fd-bc6e-48b064713afa/segments/3:4:1/Flux_Schnell_create_a_beautiful_ceramic_cup_with_a_vibrant_cir_2.jpg',

    next: 5,
  },

]

const currentStep = useLocalStorage('currentStep', 0)
const lastCustomerId = useLocalStorage('last-customer-id', '')
const funnelStep = useLocalStorage('funnel-step', 0)
const status = useSessionStorage('status')

const handlePurchase = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false

  try {
    const response = await $fetch('/api/stripe/charge-additional', {
      method: 'POST',
      body: {
        customerId: customerId.value,
        paymentMethodId: paymentMethodId.value,
        amount: steps[currentStep.value].amount,
        step: steps[currentStep.value].title,
      },
    })

    console.log('API Response:', response)

    if (response.success) {
      success.value = true
      toast.add({ severity: 'success', summary: 'Platba byla ůspěšná', detail: 'Děkujeme ! Položka je přidána k objednávce', life: 3000 })

      // Zpracujeme další krok po úspěšné platbě
      console.log('Moving to next step')
      processNextStep()
      return // Ukončíme funkci zde, aby se nevykonala další část
    }

    if (response.requiresAction) {
      const { error: stripeError } = await stripe.value.handleNextAction({
        clientSecret: response.clientSecret,
        return_url: window.location.href,
      })

      if (stripeError) throw stripeError
      // Pokud není žádná chyba, ale požaduje se akce, neukončujeme funkci
      // Výsledek akce bude zpracován po přesměrování
    }
  }
  catch (e) {
    console.error('Payment error:', e)
    error.value = e.message || 'Payment failed'
    toast.add({ severity: 'error', summary: 'Chyba', detail: 'Platba nebyla ůspěšná, kontaktujte nás', life: 3000 })
  }
  finally {
    isLoading.value = false
  }
}

const processNextStep = () => {
  console.log('Processing next step from current step:', currentStep.value)

  const currentStepData = steps[currentStep.value]
  console.log('Current step data:', currentStepData)

  if (currentStepData.next === null) {
    console.log('This is the last step, navigating to thank-you')
    // Poslední krok - nastavíme hodnoty na null a přesměrujeme
    funnelStep.value = 0
    status.value = null
    navigateTo('/thank-you')
    return
  }

  // Najdeme index dalšího kroku
  const nextStepIndex = steps.findIndex(step => step.id === currentStepData.next)
  console.log('Next step index:', nextStepIndex)

  if (nextStepIndex !== -1) {
    console.log('Setting currentStep to:', nextStepIndex)
    currentStep.value = nextStepIndex
  }
  else {
    console.log('No next step found, treating as last step')
    // Nenašli jsme další krok, považujeme to za poslední
    funnelStep.value = 0
    status.value = null
    navigateTo('/thank-you')
  }
}

// Přejmenováváme starou funkci nextStep na skipStep pro větší jasnost
const nextStep = processNextStep

const skipStep = () => {
  console.log('Skip step from current step:', currentStep.value)

  if (steps[currentStep.value].id === 1) {
    // Pokud jsme na kroku 1 (Upsell 1), přejdeme na krok 2 (Downsell 1)
    const downsellIndex = steps.findIndex(step => step.id === 2)
    console.log('Skipping to downsell index:', downsellIndex)
    currentStep.value = downsellIndex
  }
  else {
    // Jinak postupujeme jako normálně
    processNextStep()
  }
}

// Synchronizace currentStep s funnelStep
watch(currentStep, newStep => {
  console.log('Watch triggered: currentStep changed to', newStep)
  funnelStep.value = newStep
})
onMounted(async () => {
  stripe.value = await loadStripe()
  /* loadStripeElements() */
})
onMounted(async () => {
  console.log('Component mounted')
  console.log('lastCustomerId:', lastCustomerId.value)
  console.log('customerId:', customerId.value)

  if (lastCustomerId.value !== customerId.value) {
    console.log('Customer ID changed, resetting to step 0')
    currentStep.value = 0
    lastCustomerId.value = customerId.value
  }

  if (route.query.payment_intent) {
    console.log('Processing payment_intent from URL:', route.query.payment_intent)

    try {
      const { success: paymentSuccess } = await $fetch(`/api/stripe/verify-payment?payment_intent=${route.query.payment_intent}`)
      console.log('Payment verification result:', paymentSuccess)

      router.replace({ query: {} })
      success.value = paymentSuccess

      if (paymentSuccess) {
        toast.add({ severity: 'success', summary: 'Platba byla ůspěšná', detail: 'Děkujeme ! Položka je přidána k objednávce', life: 5000 })
        console.log('Payment successful, moving to next step')
        processNextStep()
      }
      else {
        error.value = 'Payment failed'
        toast.add({ severity: 'error', summary: 'Chyba', detail: 'Platba nebyla ůspěšná, Zkuste to znova', life: 3000 })
      }
    }
    catch (e) {
      console.error('Payment verification error:', e)
      error.value = 'Payment verification failed'
      toast.add({ severity: 'error', summary: 'Chyba', detail: 'Ověření platby selhalo', life: 3000 })
    }
  }
})

const currentStepData = computed(() => {
  if (currentStep.value >= 0 && currentStep.value < steps.length) {
    return [steps[currentStep.value]]
  }
  return []
})

const totalSteps = computed(() => steps.length)
const progressBarWidth = computed(() => {
  if (totalSteps.value > 0) {
    return ((currentStep.value + 1) / totalSteps.value) * 100
  }
  return 0 // Nebo jiná výchozí hodnota, pokud nemáš žádné kroky
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-cyan-50 via-primary-50 to-white p-2">
    <Loader v-if="isLoading" />
    <div class="container mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <!-- Horní varování - více výrazné -->
      <div class="text-center pt-2">
        <div class="inline-block bg-red-600 text-white px-6 py-3 rounded-lg animate-pulse mb-6 shadow-lg transform hover:scale-105 transition-transform">
          <span class="text-lg font-black uppercase tracking-wider">⚠️ POZOR! DŮLEŽITÉ UPOZORNĚNÍ</span>
        </div>
      </div>

      <!-- Nadpis a info - větší a výraznější -->
      <div class="text-center space-y-6 px-4 sm:px-8">
        <h1 class="text-4xl sm:text-6xl font-black text-gray-900 leading-tight">
          🛑 <span class="underline decoration-red-500 decoration-4">STOP!</span> Vaše objednávka
          <span class="text-primary bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">ještě není dokončena!</span>
        </h1>
        <p class="text-xl sm:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          Právě teď máte <span class="font-black text-primary">EXKLUZIVNÍ PŘÍLEŽITOST</span> získat
          <span class="underline decoration-wavy decoration-primary-400">speciální bonusy a dárky ZDARMA!</span>
          <br>
          <br>
          <strong class="text-red-600 text-2xl font-black">Jakmile stránku zavřete, tato nabídka NAVŽDY ZMIZÍ!</strong>
        </p>
      </div>

      <!-- Větší prostor kolem progres baru -->
      <div class="max-w-4xl mx-auto my-5 px-4">
        <div class="w-full bg-gray-200 rounded-full h-5 overflow-hidden shadow-inner">
          <div
            class="h-5 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full transition-all duration-500 flex items-center justify-center text-sm text-gray-700 font-black"
            :style="{ width: progressBarWidth + '%' }"
          >
            {{ Math.round(progressBarWidth) }}% HOTOVO
          </div>
        </div>
        <div class="mt-3 sm:ml-4rem ml-2rem grid gap-2" :style="{ 'grid-template-columns': `repeat(${steps.length}, 1fr)` }">
          <div v-for="(step, index) in steps" :key="step.id" gap-2 flex items-center class="text-sm sm:text-base font-bold text-gray-700">
            <span sm:block hidden> KROK</span> {{ index + 1 }}.
          </div>
        </div>
      </div>

      <!-- Kroková nabídka - větší prostor a výraznější design -->
      <div class="bg-white border-2 border-red-300 rounded-3xl shadow-2xl p-0 sm:p-4 relative mx-0 sm:mx-8 my-10">
        <!-- Badge "časově omezeno" - větší a výraznější -->
        <div class="absolute -top-6 -right-6 bg-red-600 text-white text-sm px-4 py-4 rounded-full font-black transform rotate-12 shadow-xl z-10">
          <div class="text-center leading-tight">
            <div>ČASOVĚ</div>
            <div>OMĚZENO!</div>
          </div>
        </div>

        <!-- Animovaný obsah -->
        <div v-auto-animate class="space-y-8">
          <SalesStairsStep
            v-for="step in currentStepData"
            :key="step.id"
            :title="step.title"
            :description="step.description"
            :cta-text="step.ctaText"
            :fomo-text="step.fomoText"
            :price="step.amount"
            :discounted-price="step.discountedAmount"
            :image-url="step.imageUrl"
            @pay="handlePurchase"
            @skip="skipStep"
          />
        </div>

        <!-- Zpětná vazba uživateli - větší a výraznější -->
        <div v-if="success" class="mt-8 p-5 bg-green-100 border-2 border-green-300 text-green-800 rounded-xl text-center font-black text-lg shadow-inner">
          ✅ SUPER! Platba proběhla ÚSPĚŠNĚ! Zpracováváme váš bonus...
        </div>
        <div v-if="error" class="mt-8 p-5 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl text-center font-bold text-lg">
          ❌ CHYBA! {{ error }} ZKUSTE TO PROSÍM ZNOVU.
        </div>
      </div>

      <!-- FOMO časovač - větší a výraznější -->
      <div class="text-center space-y-6 my-12">
        <p class="text-2xl font-black text-gray-900">
          <span class="inline-block h-3 w-3 rounded-full bg-red-600 animate-ping mr-2" />
          TATO NABÍDKA VYPRŠÍ ZA:
        </p>
        <div class="flex justify-center font-mono text-4xl font-black text-primary space-x-4">
          <span class="bg-gray-100 px-4 py-3 rounded-xl shadow-lg border-2 border-gray-300">05</span>
          <span class="flex items-center text-red-500">:</span>
          <span class="bg-gray-100 px-4 py-3 rounded-xl shadow-lg border-2 border-gray-300">00</span>
          <span class="flex items-center text-red-500">:</span>
          <span class="bg-gray-100 px-4 py-3 rounded-xl shadow-lg border-2 border-gray-300 animate-pulse text-red-500">00</span>
        </div>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto italic font-medium">
          ⚠️ Po zavření této stránky se nabídka AUTOMATICKY SMAŽE a už ji NIKDY NEUVÍDÍTE!
          <br>Ani v e-mailu. Ani jinde. JE TO TED NEBO NIKDY!
        </p>
      </div>
    </div>
  </div>
</template>
