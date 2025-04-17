<script setup lang=ts>
import VueScrollTo from 'vue-scrollto'

const value = ref(null)

const { totalItems } = useCart()
const { totalPrice } = storeToRefs(useCart())

const { currentStep, values, errors, meta, isSubmitting } = storeToRefs(useCheckoutStore())
const { resetForm, handleSubmit, setFieldValue, validateStep, goToPreviousStep } = useCheckoutStore()

onMounted(() => {
  if (!totalItems || !totalPrice || totalPrice <= 0) {
    navigateTo('/')
  }
})
watch(totalPrice, newValue => {
  if (!totalItems || newValue <= 0) {
    navigateTo('/')
  }
})
const targetSection = ref(null)
const scrollToSection = () => {
  // Nastavení pomalého scrollu
  VueScrollTo.scrollTo('#targetSection', 1000, {
    easing: 'ease-in-out',
    offset: 0,
    cancelable: true,
  })
}

function validateUser () {
  scrollToSection()
  validateStep()
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
        <div v-auto-animate min-h-800px>
          <div v-if="currentStep === 1">
            <CheckoutUserInformation />
          </div>
          <div v-if="currentStep === 2">
            <div class="col-span-12 lg:col-span-6">
              <div class="p-6 bg-white shadow-md rounded-md">
                <h2 class="text-xl font-bold mb-4">
                  Platební údaje
                </h2>
                <div class="mb-4">
                  <label for="cardNumber" class="block text-sm font-medium text-gray-700">Číslo karty</label>
                  <InputText id="cardNumber" class="w-full mt-1" placeholder="1234 1234 1234 1234" />
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label for="expiryDate" class="block text-sm font-medium text-gray-700">Platnost</label>
                    <InputText id="expiryDate" class="w-full mt-1" placeholder="MM/RR" />
                  </div>
                  <div>
                    <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                    <InputText id="cvc" class="w-full mt-1" placeholder="123" />
                  </div>
                </div>
                <Button label="Zaplatit" class="w-full bg-primary-500 text-white" />
              </div>
            </div>
          </div>
        </div>
        <div class=" flex flex-col lg:flex-row justify-center items-center lg:justify-end mt-12">
          <Button v-ripple size="large" class="w-full  bg-primary-500 text-gray-700" :loading="isSubmitting" :disabled="!meta.valid || isSubmitting" label="Přejít k platbě" @click="validateUser()" />
          <Button v-ripple size="large" class="w-full  bg-primary-500 text-gray-700" :loading="isSubmitting" label="zpet" @click="currentStep = 1" />
          {{ currentStep }}
        </div>
      </div>
      <CheckoutSummary />
    </div>
  </div>
</template>
