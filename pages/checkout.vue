<script setup lang=ts>
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
</script>

<template>
  <div container>
    <div class="grid grid-cols-12 gap-4 grid-nogutter">
      <div class="col-span-12 lg:col-span-6 h-full px-6 py-12 md:px-12 lg:px-20">
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
        <CheckoutUserInformation />
        <div class=" flex flex-col lg:flex-row justify-center items-center lg:justify-end mt-12">
          <Button v-ripple size="large" class="w-full  bg-primary-500 text-gray-700" :loading="isSubmitting" :disabled="!meta.valid || isSubmitting" label="Přejít k platbě" />
        </div>
      </div>
      <CheckoutSummary />
    </div>
  </div>
</template>
