<script setup lang="ts">
import Button from 'primevue/button'

const emits = defineEmits(['pay', 'skip'])

interface SalesStepProps {
  title: string
  description: string
  ctaText: string
  fomoText?: string
  price?: number | null
  discountedPrice?: number | null
  imageUrl?: string // Nový prop pro obrázek
}

const props = defineProps<SalesStepProps>()
</script>

<template>
  <div class=" p-6 h-full flex-col border-dashed  rounded-xl bg-gradient-to-b from-primary-50 to-white flex-auto flex justify-between items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
    <!-- Speciální badge - nový prvek -->

    <!-- Obrázek - nový prvek -->
    <div v-if="imageUrl" class="w-full h-80 mb-6 rounded-lg overflow-hidden shadow-md">
      <img
        :src="imageUrl"
        :alt="title"
        class="w-full h-full object-cover object-center"
        loading="lazy"
      >
    </div>
    <div v-else class="w-full h-40 mb-6 rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
      <span class="text-4xl">🎁</span>
    </div>

    <!-- Obsah -->
    <div class="flex-1 flex flex-col justify-center">
      <!-- Nadpis s větším důrazem -->
      <h2 class="text-3xl sm:text-4xl font-black mb-4 text-gray-900 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
        {{ title }}
      </h2>

      <!-- Popis - větší a lépe čitelný -->
      <p class="mb-6 text-lg text-gray-800 leading-relaxed">
        {{ description }}
      </p>

      <!-- Cena - výraznější design -->
      <div v-if="price !== undefined || discountedPrice !== undefined" class="mb-6 p-3 bg-white rounded-lg shadow-inner border-2 border-primary-100">
        <div v-if="discountedPrice !== undefined && discountedPrice !== null" class="text-lg line-through text-gray-500 mb-1">
          Původní cena: {{ formatPrice(price ?? 0) }}
        </div>
        <div class="text-3xl font-black" :class="{ 'text-red-600': discountedPrice !== undefined && discountedPrice !== null }">
          {{ formatPrice(discountedPrice !== undefined && discountedPrice !== null ? discountedPrice : price || 0) }}
          <span v-if="discountedPrice" class="block text-lg font-normal text-green-600 mt-1">
            UŠETŘÍTE {{ formatPrice(price! - discountedPrice) }}!
          </span>
        </div>
        <div v-if="price === null && discountedPrice === null" class="text-base text-primary-600 font-medium">
          Cena se dopočítá
        </div>
      </div>
    </div>

    <!-- Akční prvky -->
    <div class="w-full">
      <!-- Hlavní tlačítko - výraznější -->
      <Button
        mb-2
        size="large"
        class="w-full py-3 text-lg font-bold rounded-xl bg-green-500 hover:to-green-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        @click="emits('pay')"
      >
        <span class="text-white drop-shadow-md">{{ ctaText }} {{ formatPrice(discountedPrice !== undefined && discountedPrice !== null ? discountedPrice : price || 0) }}</span>
      </Button>
      <br>
      <span mt-4 class="text-gray-500 drop-shadow-md">(Kliknutím na tlačítko vám odečteme z karty  {{ formatPrice(discountedPrice !== undefined && discountedPrice !== null ? discountedPrice : price || 0) }}  )</span>
      <!-- FOMO text - více výrazný -->

      <!-- Sekundární tlačítko - méně výrazné -->
      <Button
        variant="text"
        severity="secondary"
        size="small"
        class="mt-4 opacity-80 hover:opacity-100 transition-opacity"
        @click="emits('skip')"
      >
        <span class="text-lg text-gray-800 underline">Tohle nechci, chci pokračovat dál</span>
      </Button>
      <p v-if="props.fomoText" class="text-base text-red-600 mt-3 font-bold animate-pulse">
        ⚠️ {{ fomoText }}
      </p>
    </div>
  </div>
</template>
