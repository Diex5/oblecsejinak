<script setup lang="ts">
/* const { totalItems, removeItem, removeDiscount } = useCart()
const { cartItems, totalPrice, discount } = storeToRefs(useCart())

const { currentStep, values, onlyActiveUpsells, isSubmitting, totalOrderPrice } = storeToRefs(useCheckoutStore()) */

const { loadStripeElements, loadStripe, handleSubmit } = useStripeStore()
const { customerId, isLoading, stripe } = storeToRefs(useStripeStore())
onMounted(async () => {
  customerId.value = null
  stripe.value = await loadStripe()

  /* loadStripeElements() */
})
</script>

<template>
  <div class="col-span-12 lg:col-span-6">
    <div class="p-6 bg-white shadow-md rounded-md">
      <h2 class="text-xl font-bold mb-4">
        Platební údaje {{ customerId }}
      </h2>
      <form id="payment-form" mx-auto>
        <div id="linkAuthenticationElement" />

        <div id="payment-element" w-full />
        <Button id="load-elements" @click="loadStripeElements">
          Load Payment Elements
        </Button>
        <Button id="submit" :disabled="isLoading" @click="handleSubmit">
          Pay now
        </Button>
      </form>
    </div>
  </div>
</template>
