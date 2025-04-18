<script setup lang="ts">
const { errors } = storeToRefs(useStripeStore())

const lastError = computed(() => errors.value[errors.value.length - 1] || null)
</script>

<template>
  <div class="col-span-12 lg:col-span-6 min-h-400px">
    <div class="p-6 bg-white shadow-md rounded-md">
      <h2 class="text-xl font-bold mb-4">
        Platební údaje
      </h2>
      <div v-if="lastError" class="text-center p-3 mb-4 bg-red-50 rounded-md text-red-500 mt-2">
        {{ lastError }}
      </div>
      <form id="payment-form" mx-auto>
        <div id="linkAuthenticationElement" />

        <div id="payment-element" w-full />
      </form>
    </div>
  </div>
</template>
