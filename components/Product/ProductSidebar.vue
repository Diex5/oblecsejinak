<script setup lang=ts>
import Button from 'primevue/button'
import type { ProductWithVariants } from '~/server/database/schema'

const props = defineProps<{
  product: ProductWithVariants
  colors: { id: number, name: string, hex: string, available: boolean }[]
  sizes: { id: number, label: string, available: boolean }[]
}>()

const emit = defineEmits(['increment-count', 'decrement-count', 'update-color', 'update-size', 'update-variant'])

const { selectedColorId, selectedSizeId, isInStock, price, currentVariant, quantity } = storeToRefs(useProduct())
const { clearCart, totalItems, addToCart } = useCart()
const { cartItems } = storeToRefs(useCart())

/* onMounted(() => {
  // Získání varianty produktu
  clearCart()
}) */
const date = new Date().toISOString()
/* const fullStars = computed(() => Math.floor(props.rating))
const hasHalfStar = computed(() => props.rating % 1 >= 0.5)
const emptyStars = computed(() => 5 - fullStars.value - (hasHalfStar.value ? 1 : 0))
 */

// Zaokrouhlené hodnocení pro zobrazení
/* const formattedRating = computed(() => props.rating.toFixed(1)) */

// FOMO zprávy pro nízký stav zásob
/* const stockMessage = computed(() => {
  if (props.stock === 'low') {
    return { icon: 'pi pi-exclamation', message: 'Zbývá posledních pár kusů!' }
  }
  else if (props.stock === 'medium') {
    return { icon: 'pi pi-clock', message: 'Dostatek kusů skladem' }
  }
  return null
}) */

// Formátování počtu recenzí
/* const formattedReviews = computed(() => {
  return new Intl.NumberFormat('cs-CZ').format(props.reviews)
}) */
</script>

<template>
  <div v-motion-fade-visible-once class="w-full lg:w-[30rem] relative flex flex-col gap-4">
    <!-- Počet sledujících -->
    <div
      v-motion v-motion-slide-bottom
      :delay="400" :duration="200" class="flex items-center justify-center text-surface-900 bg-surface-50 p-3 rounded-lg shadow-sm"
    >
      <div class="relative w-3 h-3" mr-4rem>
        <!-- Základní bod -->
        <div class="absolute inset-0 bg-red-500 rounded-full blur-3 z-10" />

        <!-- Glow efekt -->
        <div class="absolute inset-0 bg-red-400 rounded-full blur-sm opacity-50 duration-50 delay-1200  animate-ping z-0" />
      </div>
      <i class="pi pi-users !text-xl !leading-none mr-4 text-primary" />
    <!--   <span class="text-base font-medium"><b>{{ viewers }} lidí</b> si právě prohlíží tento produkt.</span> -->
    </div>

    <!-- Video náhled -->
    <div class="cursor-pointer relative w-full h-60 rounded-lg overflow-hidden shadow-md hover:opacity-95 transition-opacity">
      <!-- <div class="w-full h-full bg-[rgba(0,0,0,0.08)] absolute top-0 left-0 z-10 flex items-center justify-center">
        <div class="bg-surface-0 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-colors">
          <i class="pi pi-play text-lg text-surface-900 ml-0.5" />
        </div>
      </div> -->
      <!--  <img
        class="absolute top-0 left-0 w-full h-full object-cover"
        :src="videoThumbnail"
        alt="Video náhled produktu"
      > -->
    </div>
    <!-- <Test /> -->
    <div class="flex items-center gap-3 mt-2">
      <div v-if="product.discount && date >= product.discount_start && date <= product.discount_end">
        <div class="text-xl text-red-600  line-through">
          {{ formatPrice(currentVariant?.price) }}
        </div>
        <div class="text-4xl lg:text-5xl text-primary font-semibold">
          {{ formatPrice(discountedPrice(currentVariant?.price, product.discount)) }}
        </div>
      </div>
      <div v-else>
        <div class="text-4xl lg:text-5xl text-primary font-semibold">
          {{ formatPrice(currentVariant?.price || product.base_price) }}
        </div>
      </div>
    </div>

    <!-- Hodnocení -->
    <!-- <div class="flex items-center gap-3">
      <div class="flex items-center gap-1">
        <i v-for="n in fullStars" :key="`full-${n}`" class="pi pi-star-fill !text-xl !leading-none text-amber-500" />
        <i v-if="hasHalfStar" class="pi pi-star-fill !text-xl !leading-none text-amber-500 opacity-70" />
        <i v-for="n in emptyStars" :key="`empty-${n}`" class="pi pi-star !text-xl !leading-none text-surface-300" />
      </div>
      <div class="text-surface-700 font-medium">
        {{ formattedReviews }} recenzí
      </div>
    </div>
 -->
    <!-- Výběr barvy -->

    <ProductVariantSelector :row="true" :colors="colors" :sizes="sizes" />

    <!-- Upozornění na dostupnost -->
    <!-- <div v-if="stockMessage" class="bg-yellow-100 text-yellow-900 text-base inline-flex items-center px-4 py-2 font-medium mb-6 rounded-lg">
      <i :class="stockMessage.icon" class="mr-2" />
      <span>{{ stockMessage.message }}</span>
    </div> -->

    <!-- Tlačítko pro přidání do košíku -->
    <div w-full>
      <Button
        w-full
        size="large"
        class="!text-2rem !py-4 font-oswald! !duration-450 !font-medium !text-black" bg-primary-400
        icon="pi pi-cart-plus !text-1.8rem"
        label="Přidat do košíku"
        @click="addToCart(product, currentVariant, price, quantity)"
      />
      {{ currentVariant.size_id }}
    </div>

    <!-- Doporučení -->
    <!--  <div class="bg-surface-50 rounded-lg p-4 mb-6 mt-4 shadow-sm">
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
    </div> -->

    <!-- Seznam benefitů -->
    <!-- <ul class="list-none w-full flex flex-col items-center justify-center text-lg p-0 m-0 font-medium text-surface-600 bg-surface-50 rounded-lg py-6 shadow-sm">
      <li
        v-for="(benefit, index) in product.benefits"
        :key="index"
        class="flex items-center mb-4 last:mb-0"
      >
        <i :class="benefit.icon" class="mr-3 text-primary" />
        <span>{{ benefit.text }}</span>
      </li>
    </ul> -->
  </div>
</template>
