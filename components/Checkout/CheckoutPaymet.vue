<!-- <script setup lang="ts">
const { totalItems, removeItem, removeDiscount } = useCart()
const { cartItems, totalPrice, discount } = storeToRefs(useCart())

const { currentStep, values, onlyActiveUpsells, isSubmitting, totalOrderPrice } = storeToRefs(useCheckoutStore())
</script> -->

<template>
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
</template>
