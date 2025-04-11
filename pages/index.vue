<script setup lang="ts">
import type { Products, ProductWithVariants } from '~/server/database/schema'

const product = ref()

async function fetchProduct () {
  const { data, error } = await useFetch<ProductWithVariants>(`/api/products/${5}`)

  if (error.value) {
    console.error('Error fetching product:', error.value)
    return
  }

  product.value = data.value
  console.log('Product data:', product.value)
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div>
    <pre>{{ product }}</pre>
  </div>
</template>
