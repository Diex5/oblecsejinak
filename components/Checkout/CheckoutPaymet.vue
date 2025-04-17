<script setup lang="ts">
/* const { totalItems, removeItem, removeDiscount } = useCart()
const { cartItems, totalPrice, discount } = storeToRefs(useCart())

const { currentStep, values, onlyActiveUpsells, isSubmitting, totalOrderPrice } = storeToRefs(useCheckoutStore()) */

const { loadStripeElements, loadStripe, handleSubmit } = useStripeStore()
const { customerId, isLoading, stripe } = storeToRefs(useStripeStore())
const { currentStep, values, errors, meta, isSubmitting, totalOrderPrice } = storeToRefs(useCheckoutStore())
</script>

<template>
  <div class="col-span-12 lg:col-span-6 min-h-400px">
    <div class="p-6 bg-white shadow-md rounded-md">
      <h2 class="text-xl font-bold mb-4">
        Platební údaje {{ customerId }}
      </h2>
      <form id="payment-form" mx-auto>
        <div id="linkAuthenticationElement" />

        <div id="payment-element" w-full />
      </form>
    </div>
  </div>
</template>
