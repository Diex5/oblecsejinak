<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

const props = defineProps<{
  images: string[]
}>()
const imgs = props.images

const onSwiper = (swiper: any) => {
  console.log(swiper)
}
</script>

<template>
  <div class="flex flex-col lg:flex-row h-auto gap-4 xl:gap-6">
    <!-- Hlavní obrázek -->
    <div class="relative w-full lg:flex-1 h-[24rem] xl:h-[36rem] bg-surface-100 rounded-lg overflow-hidden shadow-md">
      <NuxtImg
        class="absolute top-0 left-0 w-full h-full object-cover"
        :src="imgs[0]"
        :alt="'Hlavní obrázek'"
      />
    </div>

    <!-- Grid pro desktop -->
    <div class="hidden lg:grid flex-[0.8] md:flex-1 grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
      <div
        v-for="(image, index) in imgs.slice(1, 5)"
        :key="'grid-' + index"
        class="relative flex-1 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <NuxtImg
          class="absolute top-0 left-0 w-full h-full object-cover"
          :src="image"
          :alt="'Detailní obrázek ' + (index + 1)"
        />
      </div>
    </div>

    <!-- Swiper pro mobily -->
    <div class="lg:hidden mt-4">
      <swiper
        :modules="[Pagination]"
        :slides-per-view="2"
        :space-between="10"
        :pagination="{ clickable: true }"
        class="w-full pb-6"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="(image, index) in imgs.slice(1, 5)"
          :key="'slide-' + index"
          class="h-[12rem] rounded-lg overflow-hidden shadow-md"
        >
          <NuxtImg
            class="w-full h-full object-cover"
            :src="image"
            :alt="'Detailní obrázek ' + (index + 1)"
          />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
/* Styling pagination přes ::v-deep */
::v-deep(.swiper-pagination) {
  margin-top: 16px;

  display: flex;
  justify-content: center;
  gap: 8px;
  position: relative !important;
  bottom: 0 !important;
  z-index: 10;
  pointer-events: auto;
}

::v-deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: #94a3b8;
  opacity: 0.6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

::v-deep(.swiper-pagination-bullet-active) {
  background: #1e293b;
  opacity: 1;
  transform: scale(1.3);
}
</style>
