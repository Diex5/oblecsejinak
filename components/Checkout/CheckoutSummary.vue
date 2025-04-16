<script setup lang="ts">
const { totalItems, removeItem, removeDiscount } = useCart()
const { cartItems, totalPrice, discount } = storeToRefs(useCart())

const { currentStep, values, onlyActiveUpsells, isSubmitting, totalOrderPrice } = storeToRefs(useCheckoutStore())

const reversedCartItems = computed(() => [...cartItems.value].reverse())
</script>

<template>
  <div md:sticky top-0 left-0 class="col-span-12 lg:col-span-6 px-6 py-20 md:px-12 lg:px-20 bg-surface-50/50 ">
    <div class="border-b pb-4 border-surface">
      <span class="text-surface-900  font-medium text-xl">Váš košík ({{ totalItems }})</span>
    </div>
    <ul v-auto-animate class=" divide-y divide-gray-200 flex flex-col gap-4 my-1rem overflow-y-auto min-h-150px overflow-x-hidden max-h-[300px] w-full">
      <!-- qs -->
      <li v-for="(cart, index) in reversedCartItems" :key="index" class="flex  bg-#fff/50 rounded-md px-2" w-full>
        <div class="flex items-start md:items-center border-t w-full border-surface pt-3 mb-3 ">
          <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-1.png" class="w-14 h-14 flex-shrink-0">
          <div class="pl-4 flex-auto">
            <div class="flex items-center justify-between ">
              <span class="text-primary font-medium">{{ cart.name }}</span>
              <span class="text-surface-900  font-medium">{{ formatPrice(cart.price * cart.quantity) }}</span>
              <a class="cursor-pointer text-primary hover:text-primary-emphasis transition-colors duration-300" @click="removeItem(cart.productId, cart.variantId)"><i class="pi pi-trash !text-xs !leading-none" /></a>
            </div>
            <div flex items-center gap-2>
              <div w-3 h-3 rounded-full :style="{ backgroundColor: cart.color.hex_code }" />
              <span class="text-surface-800 text-base">{{ cart.size.name }}</span>
              {{ cart.quantity }}Ks
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="py-2 mt-4 border-b border-surface">
      <CouponComponent />
    </div>

    <div v-auto-animate md:sticky top-0 left-0 w-full class="py-2 my-4 text-lg">
      <div v-if="discount.isActive" class="flex items-center justify-between border-b-dotted border-b-2">
        <span class="text-surface-900  font-medium py-1 ">Kupón: <b bg-primary-100 px-2 text-base rounded-md> {{ discount.name }}</b><UnoIcon class="pi pi-times hover:text-red-500 text-base ml-2 transition-all duration-250 cursor-pointer mr-4" aria-hidden="true" @click="removeDiscount()" /></span>
        <span class="text-surface-900 text-red-600 font-bold">-{{ formatPrice(discount.discountedAmount) }} </span>
      </div>
      <div class="flex items-center justify-between border-b-dotted border-b-2">
        <span class="text-surface-900  font-medium">Mezisoučet</span>
        <span class="text-surface-900 ">{{ formatPrice(totalPrice) }}</span>
      </div>

      <div class="flex items-center justify-between mb-2 border-b-dotted border-b-2">
        <span class="text-surface-900  font-medium"> <UnoIcon class="pi pi-truck" aria-hidden="true" /> {{ values.shippingMethod.title }}</span>
        <span class="text-primary ">{{ formatPrice(Number(values.shippingMethod.price)) }}</span>
      </div>
      <div v-for="(item, index) in onlyActiveUpsells" :key="index" class="flex items-center justify-between mb-2 border-b-dotted border-b-2">
        <span class="text-surface-900  font-medium"> {{ item.title }}</span>
        <span class="text-primary ">{{ formatPrice(Number(item.price)) }}</span>
      </div>
      <div class="flex items-center justify-between mb-4 border-t-2 border-black pt-2">
        <span class="text-surface-900  font-bold">Celkem to činí</span>

        <span class="text-surface-900  font-medium text-xl">{{ formatPrice(totalOrderPrice) }}</span>
      </div>
    </div>
    <div class="py-2 mt-4 gap-1rem bg-highlight flex items-center flex-col justify-center">
      <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/checkoutform/checkoutform-1-3.png" class="mr-2" alt="Country Flag"><span
        class="text-highlight-contrast font-medium"
      >100% Garance vrácení peněz, bez otázek do 30 dnů</span>
      <CheckoutPumpSalesPumpCard id="ebook2" :title="'Ebook1'" :price="32" />
      <CheckoutPumpSalesPumpCard id="ebook3" :title="'Ebook1'" :price="322" />
    </div>
  </div>
</template>
