<script setup lang="ts">
const { applyDiscount } = useCart()
const { discount } = storeToRefs(useCart())
</script>

<template>
  <div v-if="!discount.isActive" class="">
    <div class="flex gap-1 items-center">
      <InputText
        type="text"
        size="small"
        placeholder="Slevový kód"
        class="flex-1 w-100px! px-4 py-2 border border-gray-300 rounded-l-md "
      />
      <Button
        type="button"
        size="small"
        class="bg-black bg-gray-500 text-white border-gray-500  px-4 py-2 rounded-r-md "
        @click="applyDiscount('SALE10', 'SALE10', 10)"
      >
        Použít
      </Button>
    </div>
  </div>
</template>
