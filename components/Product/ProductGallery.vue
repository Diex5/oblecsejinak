<script setup lang=ts>
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()
const imgs = props.product.images
</script>

<template>
  <div class="flex lg:flex-row flex-col h-[64rem] lg:h-auto gap-4 xl:gap-6">
    <!-- Hlavní obrázek -->
    <div class="relative flex-[0.2] md:flex-1 h-[24rem] xl:h-[36rem] bg-surface-100 rounded-lg overflow-hidden shadow-md">
      <NuxtImg
        class="absolute top-0 left-0 w-full h-full object-cover"
        :src="imgs[0].images[0].url"
        :alt="'alt'"
      />
    </div>
    <!-- Grid s detailními obrázky -->
    <div class="flex-[0.8] md:flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
      <div
        v-for="(image, index) in imgs[0].images.slice(1, 5)"
        :key="index"
        class="relative flex-1 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <NuxtImg
          class="absolute top-0 left-0 w-full h-full object-cover"
          :src="image.url"
          :alt="'alt'"
        />
      </div>
    </div>
  </div>
</template>
