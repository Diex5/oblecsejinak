<script setup lang="ts">
const { filter } = storeToRefs(useCategoryStore())
</script>

<template>
  <div h-full>
    <CategoryFilter>
      Produkty {{ filter }}
    </CategoryFilter>
  </div>
</template>
