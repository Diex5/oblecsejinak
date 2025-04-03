<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  viewers: {
    type: Number,
    required: true,
  },
  colors: {
    type: Array,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  stock: {
    type: String,
    default: 'medium', // 'low', 'medium', 'high'
  },
  count: {
    type: Number,
    required: true,
  },
  selectedColor: {
    type: String,
    required: true,
  },
  selectedSize: {
    type: String,
    required: true,
  },
  benefits: {
    type: Array,
    required: true,
  },
  recommendation: {
    type: Object,
    required: true,
  },
  videoThumbnail: {
    type: String,
    required: true,
  },
  formatPrice: {
    type: Function,
    required: true,
  },
})

const emit = defineEmits(['increment-count', 'decrement-count', 'update-color', 'update-size'])

const { addToCart } = useCart()
// Výpočet počtu hvězdiček
const fullStars = computed(() => Math.floor(props.rating))
const hasHalfStar = computed(() => props.rating % 1 >= 0.5)
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0))

// Zaokrouhlené hodnocení pro zobrazení
const formattedRating = computed(() => props.rating.toFixed(1))

// FOMO zprávy pro nízký stav zásob
const stockMessage = computed(() => {
  if (props.stock === 'low') {
    return { icon: 'pi pi-exclamation', message: 'Zbývá posledních pár kusů!' }
  }
  else if (props.stock === 'medium') {
    return { icon: 'pi pi-clock', message: 'Dostatek kusů skladem' }
  }
  return null
})

// Formátování počtu recenzí
const formattedReviews = computed(() => {
  return new Intl.NumberFormat('cs-CZ').format(props.reviews)
})
</script>

<template>
  <div class="w-full lg:w-[30rem] relative flex flex-col gap-4">
    <!-- Počet sledujících -->
    <div class="flex items-center justify-center text-surface-900 bg-surface-50 p-3 rounded-lg shadow-sm">
      <i class="pi pi-users !text-xl !leading-none mr-4 text-primary" />
      <span class="text-base font-medium"><b>{{ viewers }} lidí</b> si právě prohlíží tento produkt.</span>
    </div>

    <!-- Video náhled -->
    <div class="cursor-pointer relative w-full h-60 rounded-lg overflow-hidden shadow-md hover:opacity-95 transition-opacity">
      <!-- <div class="w-full h-full bg-[rgba(0,0,0,0.08)] absolute top-0 left-0 z-10 flex items-center justify-center">
        <div class="bg-surface-0 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors">
          <i class="pi pi-play text-lg text-surface-900 ml-0.5" />
        </div>
      </div> -->
      <img
        class="absolute top-0 left-0 w-full h-full object-cover"
        :src="videoThumbnail"
        alt="Video náhled produktu"
      >
    </div>

    <!-- Cena -->
    <div class="flex items-center gap-3 mt-2">
      <div v-if="originalPrice && originalPrice > price" class="text-xl text-red-600  line-through">
        {{ formatPrice(originalPrice) }}
      </div>
      <div class="text-4xl lg:text-5xl text-primary font-semibold">
        {{ formatPrice(price) }}
      </div>
    </div>

    <!-- Hodnocení -->
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1">
        <i v-for="n in fullStars" :key="`full-${n}`" class="pi pi-star-fill !text-xl !leading-none text-amber-500" />
        <i v-if="hasHalfStar" class="pi pi-star-fill !text-xl !leading-none text-amber-500 opacity-70" />
        <i v-for="n in emptyStars" :key="`empty-${n}`" class="pi pi-star !text-xl !leading-none text-surface-300" />
      </div>
      <div class="text-surface-700 font-medium">
        {{ formattedReviews }} recenzí
      </div>
    </div>

    <!-- Výběr barvy -->
    <div class="mt-3">
      <div class="text-lg font-medium text-surface-900 mb-1">
        Barva
      </div>
      <div class="flex items-center mb-4">
        <div
          v-for="color in colors"
          :key="color.id"
          class="w-10 h-10 flex-shrink-0 rounded-full mr-4 cursor-pointer transition-all duration-300 relative"
          :style="{ backgroundColor: color.hex }"
          :class="selectedColor === color.id ? 'ring-2 ring-offset-2 ring-offset-black shadow-md p-3' : 'opacity-80'"
          @click="$emit('update-color', color.id)"
        >
          <i v-if="selectedColor === color.id" class="pi pi-check absolute top-50% transform -translate-x-1/2 -translate-y-1/2    left-50% m-auto" />

          <!--  <span v-if="selectedColor === color.id" class="absolute top-7 left-1/2 transform -translate-x-1/2 text-sm whitespace-nowrap">
            {{ color.name }}
          </span> -->
        </div>
      </div>
    </div>

    <!-- Výběr velikosti -->
    <div>
      <div class="text-lg font-medium text-surface-900 mb-1">
        Velikost
      </div>
      <div class="flex items-center mb-8 flex-wrap gap-2">
        <div
          v-for="size in sizes"
          :key="size.id"
          class="h-10 w-10 sm:h-12 sm:w-12 text-surface-900 inline-flex justify-center items-center flex-shrink-0 rounded-md cursor-pointer hover:bg-surface-100 duration-150 transition-colors"
          :class="[
            selectedSize === size.id
              ? 'border-primary border-2 text-primary font-medium'
              : 'border border-surface-300',
          ]"
          @click="$emit('update-size', size.id)"
        >
          {{ size.label }}
        </div>
      </div>
    </div>

    <!-- Upozornění na dostupnost -->
    <div v-if="stockMessage" class="bg-yellow-100 text-yellow-900 text-base inline-flex items-center px-4 py-2 font-medium mb-6 rounded-lg">
      <i :class="stockMessage.icon" class="mr-2" />
      <span>{{ stockMessage.message }}</span>
    </div>

    <!-- Počítadlo množství -->
    <div class="w-full rounded-full border border-surface-200 p-3 flex gap-3 mb-4">
      <button
        class="hover:bg-surface-200 text-surface-900 w-10 h-10 flex items-center justify-center border border-surface-200 rounded-full"
        :disabled="count <= 1"
        :class="{ 'opacity-50 cursor-not-allowed': count <= 1 }"
        @click="$emit('decrement-count')"
      >
        <i class="pi pi-minus text-lg" />
      </button>
      <div class="flex-1 text-center border border-surface-200 rounded-full flex items-center justify-center text-surface-900 font-medium text-lg">
        {{ count }}
      </div>
      <button
        class="hover:bg-surface-200 text-surface-900 w-10 h-10 flex items-center justify-center border border-surface-200 rounded-full"
        @click="$emit('increment-count')"
      >
        <i class="pi pi-plus text-lg" />
      </button>
    </div>

    <!-- Tlačítko pro přidání do košíku -->
    <Button
      size="large" font-oswald
      class="!text-1.8rem !py-4 !font-medium" bg-primary-500 text-black
      icon="pi pi-shopping-cart"
      label="Přidat do košíku"
      @click="addToCart({ product, variant: { colorId: 2, sizeId: 3, price: 997 } })"
    />

    <!-- Doporučení -->
    <div class="bg-surface-50 rounded-lg p-4 mb-6 mt-4 shadow-sm">
      <div class="text-surface-900 text-xl font-medium mb-6">
        Doporučujeme k produktu
      </div>
      <div class="flex items-center">
        <img :src="recommendation.image" class="w-20 h-20 flex-shrink-0 object-cover rounded-md">
        <div class="pl-4">
          <span class="text-surface-900 text-lg font-medium">
            {{ recommendation.name }}
          </span>
          <div class="flex gap-3 items-center">
            <p v-if="recommendation.originalPrice > 0" class="mb-0 line-through mt-2 p-0 text-surface-600 font-medium">
              Hodnota {{ formatPrice(recommendation.originalPrice) }}
            </p>
            <p class="mb-0 font-semibold text-green-500 mt-2 p-0 text-lg">
              ZDARMA
            </p>
          </div>
        </div>
        <Button class="ml-auto !rounded-full" outlined icon="pi pi-plus !text-xl !leading-none" />
      </div>
    </div>

    <!-- Seznam benefitů -->
    <ul class="list-none w-full flex flex-col items-center justify-center text-lg p-0 m-0 font-medium text-surface-600 bg-surface-50 rounded-lg py-6 shadow-sm">
      <li
        v-for="(benefit, index) in benefits"
        :key="index"
        class="flex items-center mb-4 last:mb-0"
      >
        <i :class="benefit.icon" class="mr-3 text-primary" />
        <span>{{ benefit.text }}</span>
      </li>
    </ul>
  </div>
</template>
