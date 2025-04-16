<script setup lang="ts">
const { applyDiscount } = useCart()
</script>

<template>
  <div class="my-6 py-4 border-t border-gray-200">
    <div class="flex items-center">
      <input
        type="text"
        placeholder="Slevový kód"
        class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
      <button
        type="button"
        class="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        @click="applyDiscount('SALE10', 'SALE10', 10)"
      >
        Použít
      </button>
    </div>
  </div>
</template>
