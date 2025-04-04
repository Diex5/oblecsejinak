<script setup lang="ts">
const props = defineProps<{
  product: any
  showBar: boolean
  selectedSize?: string
  selectedColor?: string
  count: number

}>()
const emit = defineEmits(['increment-count', 'decrement-count', 'update-color', 'update-size'])
const { addToCart } = useCart()

const visible = ref(false)

const addToCartMobile = (variant: any) => {
  addToCart({ product: props.product, variant })
  visible.value = false
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
    <div class="md:flex hidden md:justify-center items-center  flex-wrap gap-2">
      <div
        v-for="size in product.sizes"
        :key="size.id"
        class="h-10 w-10 sm:h-12 sm:w-12 text-surface-900 inline-flex justify-center items-center flex-shrink-0 rounded-md cursor-pointer hover:bg-surface-100 duration-150 transition-colors"
        :class="[
          selectedSize === size.id
            ? 'border-primary-600 bg-primary-500 border-2 shadow-md text-primary font-800 '
            : 'border border-surface-300',
        ]"
        @click="$emit('update-size', size.id)"
      >
        {{ size.label }}
      </div>
    </div>
    <div class="md:flex hidden items-center ">
      <div
        v-for="color in product.colors"
        :key="color.id"
        class="w-10 h-10  flex-shrink-0 rounded-full mr-4 cursor-pointer transition-all duration-300 relative"
        :style="{ backgroundColor: color.hex }"
        :class="selectedColor === color.id ? 'ring-3 ring-offset-2 ring-offset-primary-600 shadow-md p-3' : 'opacity-80'"
        @click="$emit('update-color', color.id)"
      >
        <i v-if="selectedColor === color.id" :class="color.name.toLowerCase() === 'černá' ? 'text-white' : '' " class="pi pi-check absolute top-50% transform -translate-x-1/2 -translate-y-1/2 text-1.2rem   left-50% m-auto" />

        <!--  <span v-if="selectedColor === color.id" class="absolute top-7 left-1/2 transform -translate-x-1/2 text-sm whitespace-nowrap">
            {{ color.name }}
          </span> -->
      </div>
    </div>
    <div w="md:30% full">
      <div md:flex hidden>
        <Button
          w-full
          size="large"
          class="!text-1.4rem font-oswald! !font-medium md:flex! hidden! !text-black" h-fit bg-primary-500
          icon="pi pi-cart-plus"
          label="Přidat do košíku"
          @click="addToCart({ product, variant: { colorId: 2, sizeId: 3, price: 997 } })"
        />
      </div>
      <div md:hidden flex>
        <Button
          w-full
          size="large"
          class="!text-1.4rem md:hidden! flex!  font-oswald! !text-black "
          h-fit bg-primary-500 icon="pi pi-cart-plus"
          label="Vybrat velikost"
          @click="visible = true"
        />
      </div>
      <Dialog v-model:visible="visible" class="md:hidden! block!" modal header="" :style="{ width: '25rem' }">
        <div class="mt-3">
          <div class="text-lg font-medium text-surface-900 mb-1">
            Barva
          </div>
          <div class="flex items-center mb-4">
            <div
              v-for="color in product.colors"
              :key="color.id"
              class="w-10 h-10 flex-shrink-0 rounded-full mr-4 cursor-pointer transition-all duration-300 relative"
              :style="{ backgroundColor: color.hex }"
              :class="selectedColor === color.id ? 'ring-3 ring-offset-2 ring-offset-primary-600 shadow-md p-3' : 'opacity-80'"
              @click="$emit('update-color', color.id)"
            >
              <i v-if="selectedColor === color.id" :class="color.name.toLowerCase() === 'černá' ? 'text-white' : '' " class="pi pi-check absolute top-50% transform -translate-x-1/2 -translate-y-1/2 text-1.2rem   left-50% m-auto" />
            </div>
          </div>
        </div>

        <div>
          <div class="text-lg font-medium text-surface-900 mb-1">
            Velikost
          </div>
          <div class="flex items-center mb-8 flex-wrap gap-2">
            <div
              v-for="size in product.sizes"
              :key="size.id"
              class="h-10 w-10 sm:h-12 sm:w-12 text-surface-900 inline-flex justify-center items-center flex-shrink-0 rounded-md cursor-pointer hover:bg-surface-100 duration-150 transition-colors"
              :class="[
                selectedSize === size.id
                  ? 'border-primary-600 bg-primary-500 border-2 shadow-md text-primary font-800 '
                  : 'border border-surface-300',
              ]"
              @click="$emit('update-size', size.id)"
            >
              {{ size.label }}
            </div>
          </div>
        </div>
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
        <div w-full>
          <Button
            w-full
            size="large"
            class="!text-1.4rem !py-4 font-oswald!  !text-black" bg-primary-500
            icon="pi pi-cart-plus"
            label="Přidat do košíku"
            @click="addToCartMobile({ variant: { colorId: 2, sizeId: 3, price: 997 } })"
          />
        </div>
      </Dialog>
    </div>
  </div>
</template>
