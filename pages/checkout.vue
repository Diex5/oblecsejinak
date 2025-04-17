<script setup lang=ts>
import VueScrollTo from 'vue-scrollto'
import { useSessionStorage } from '@vueuse/core'

const { totalItems } = useCart()
const { totalPrice } = storeToRefs(useCart())

const { currentStep, values, errors, meta, isSubmitting, totalOrderPrice } = storeToRefs(useCheckoutStore())
const { resetForm, handleSubmit, setFieldValue, validateStep, goToPreviousStep } = useCheckoutStore()
const { loadStripeElements, loadStripe, handleSubmit: handlePayment } = useStripeStore()
const { stripe, customerId, isLoading } = storeToRefs(useStripeStore())

onMounted(async () => {
  if (!totalItems || !totalPrice || totalPrice <= 0) {
    navigateTo('/')
  }
  useSessionStorage('status', '')
  customerId.value = null
  stripe.value = await loadStripe()
})
watch(totalPrice, newValue => {
  if (!totalItems || newValue <= 0) {
    navigateTo('/')
  }
})
const scrollToSection = async () => {
  // Nastavení pomalého scrollu
  VueScrollTo.scrollTo('#targetSection', 1000, {
    easing: 'ease-in-out',
    offset: 0,
    cancelable: true,
  })
}

async function validateUser () {
  isSubmitting.value = true
  const userData = {
    name: `${values.value.firstName} ${values.value.lastName}`,
    email: values.value.email,
  }
  /* validateStep() */

  loadStripeElements(userData, totalOrderPrice.value)
  await setTimeout(async () => {
    currentStep.value = 2
    scrollToSection()
  }, 1000)
}
</script>

<template>
  <div container>
    <div
      w-full md:flex-row flex-col flex justify-center rounded-md items-center md:justify-between p-2 mb-2rem bg-black
      text-white class="[&>div>i]:text-primary-400!"
    >
      <div id="targetSection" text-base font-500 flex gap-1 items-center>
        <i class="pi pi-check-circle" />
        30denní záruka vrácení peněz
      </div>
      <div text-base font-500 flex gap-1 items-center>
        <i class="pi pi-lock" />
        100% bezpečná objednávka
      </div>
      <div text-base font-500 flex gap-1 items-center>
        <i class="pi pi-download" />
        Získejte okamžitý přístup
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 grid-nogutter">
      <div class="col-span-12 lg:col-span-6 h-full  ">
        <ul class="flex list-none flex-wrap p-0 mb-12">
          <li class="flex items-center text-primary mr-2">
            Cart <i class="pi pi-chevron-right text-surface-500 dark:text-surface-300 !text-sm !leading-none ml-2" />
          </li>
          <li class="flex items-center text-surface-500 dark:text-surface-300 mr-2">
            Information<i class="pi pi-chevron-right text-surface-500 dark:text-surface-300 !text-sm !leading-none ml-2" />
          </li>
          <li class="flex items-center text-surface-500 dark:text-surface-300 mr-2">
            Shipping<i class="pi pi-chevron-right text-surface-500 dark:text-surface-300 !text-sm !leading-none ml-2" />
          </li>
          <li class="flex items-center text-surface-500 dark:text-surface-300 mr-2">
            Payment
          </li>
        </ul>
        <div md:min-h-800px>
          <div v-auto-animate>
            <div v-show="currentStep === 1">
              <CheckoutUserInformation />
            </div>
            <div v-show="currentStep === 2">
              <CheckoutPaymet />
            </div>
          </div>
          <div class=" flex flex-col lg:flex-row gap-1rem justify-center items-center lg:justify-end mt-12">
            <Button v-if="currentStep === 1" v-ripple size="large" class="w-full  bg-primary-500 text-gray-700" :loading="isSubmitting" :disabled="!meta.valid || isSubmitting" label="Přejít k platbě" @click="validateUser()" />
            <Button v-if="currentStep === 2" v-ripple size="large" w-full variant="outlined" :loading="isLoading" label="zpet" @click="goToPreviousStep" />
            <Button v-if="currentStep === 2" v-ripple size="large" class="w-full  bg-primary-500! text-gray-700" :disabled="isLoading" @click="handlePayment">
              Zaplatit
            </Button>
          </div>
        </div>
      </div>
      <CheckoutSummary />
    </div>
  </div>
</template>
