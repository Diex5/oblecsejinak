<script setup lang="ts">
import type { ProductWithVariants } from '~/server/database/schema'

const props = defineProps<{
  product: ProductWithVariants
  colors: { id: number, name: string, hex: string, available: boolean }[]
  sizes: { id: number, label: string, available: boolean }[]
  showBar: boolean
}>()

const emit = defineEmits(['increment-count', 'decrement-count', 'update-color', 'update-size'])

const { addToCart } = useCart()
const { isInStock, price, currentVariant, quantity } = storeToRefs(useProduct())

const visible = ref(false)

function addToCartButton () {
  if (isInStock.value) {
    addToCart(props.product, currentVariant.value, price.value, quantity.value)
    visible.value = false
  }
}
</script>

<template>
  <div
    class="fixed w-full bottom-4 left-1/2 transform  flex md:flex-row flex-col items-center md:justify-center gap-2rem -translate-x-1/2 bg-white shadow-lg px-4 py-2 rounded-lg z-50 transition-all duration-500 ease-out"
    :class="{
      'opacity-100 translate-y-0': showBar,
      'opacity-0 translate-y-12 pointer-events-none': !showBar,
    }"
  >
    <div md:block hidden>
      <ProductVariantSelector :row="false" :colors="colors" :sizes="sizes" />
    </div>
    <div w="md:30% full">
      <div md:flex hidden>
        <Button
          w-full
          size="large"
          class="!text-1.4rem font-oswald! !font-medium md:flex! hidden! !text-black" h-fit bg-primary-500
          icon="pi pi-cart-plus"
          label="Přidat do košíku"
          @click="addToCart(product, currentVariant, price, quantity)"
        />
      </div>
      <div md:hidden flex>
        <Button
          w-full
          size="large"
          class="!text-1.4rem md:hidden! flex!  font-oswald! !text-black "
          h-fit bg-primary-500 icon="pi pi-cart-plus"
          label="Koupit"
          @click="visible = true"
        />
      </div>
      <Dialog v-model:visible="visible" class="md:hidden! block!" modal header="" :style="{ width: '25rem' }">
        <ProductVariantSelector :row="true" :colors="colors" :sizes="sizes" mb-12 />
        <!--  <div class="w-full rounded-full border border-surface-200 p-3 flex gap-3 mb-4">
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
        </div> -->

        <!-- Tlačítko pro přidání do košíku -->
        <div w-full>
          <Button
            w-full
            size="large"
            class="!text-1.4rem !py-4 font-oswald!  !text-black" bg-primary-500
            icon="pi pi-cart-plus"
            label="Přidat do košíku"
            @click="addToCartButton()"
          />
        </div>
      </Dialog>
    </div>
  </div>
</template>
