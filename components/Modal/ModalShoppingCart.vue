<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { totalItems, removeItem, updateQuantity, clearCart, addToCart, removeDiscount, toggleCart } = useCart()
const { cartItems, isCartOpened, totalPrice, discount } = storeToRefs(useCart())

const reversedCartItems = computed(() => [...cartItems.value].reverse())

function redirectToCheckout () {
  if (cartItems.value.length === 0) {
    return
  }
  // Přesměrování na pokladnu
  toggleCart()
  navigateTo('/checkout')
}
</script>

<template>
  <div>
    <!-- Překrytí pozadí -->
    <Transition name="fade">
      <div
        v-if="isCartOpened"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 z-980"
        @click="toggleCart()"
      />
    </Transition>

    <!-- Panel košíku -->
    <Transition name="slide">
      <div
        v-if="isCartOpened"
        class="fixed inset-y-0 right-0 z-990 w-full md:w-96 bg-gray-50 flex flex-col"
      >
        <div class="flex items-center justify-between p-4 border-b">
          <h2 class="text-lg font-medium text-gray-900">
            Košík
          </h2>
          <button
            class="p-2 text-gray-400 hover:text-gray-500 transition-colors"
            @click="toggleCart()"
          >
            <span class="pi pi-times h-6 w-6" />
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 bg-white inset-shadow-lg inset-shadow-indigo-500">
          <TransitionGroup name="list" tag="ul" class="divide-y  divide-gray-200 min-h-[300px]">
            <li
              v-for="(cart) in reversedCartItems"
              :key="cart.productId + cart.variantId"
              class="py-4 flex w-full"
            >
              <div class="flex items-start md:items-center w-full">
                <img
                  src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-1.png"
                  class="w-20 h-20 flex-shrink-0 object-cover rounded"
                >
                <div class="pl-4 flex-auto">
                  <div class="flex items-center justify-between">
                    <span class="text-primary font-medium">{{ cart.name }}</span>
                    <button
                      class="text-primary hover:text-red-500 transition-colors"
                      @click="removeItem(cart.productId, cart.variantId)"
                    >
                      <i class="pi pi-trash text-xl" />
                    </button>
                  </div>
                  <div class="flex items-center gap-2 mt-1">
                    <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: cart.color.hex_code }" />
                    <span class="text-gray-500">{{ cart.size.name }}</span>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center border rounded overflow-hidden">
                      <button
                        class="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        @click="updateQuantity(cart.productId, cart.variantId, Math.max(1, cart.quantity - 1), cart.max_quantity)"
                      >
                        <i class="pi pi-minus text-xs" />
                      </button>
                      <span class="w-8 text-center font-medium">{{ cart.quantity }}</span>
                      <button
                        class="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                        @click="updateQuantity(cart.productId, cart.variantId, Math.min(cart.max_quantity, cart.quantity + 1), cart.max_quantity)"
                      >
                        <i class="pi pi-plus text-xs" />
                      </button>
                    </div>
                    <span class="text-gray-900 font-medium">{{ formatPrice(cart.price) }}</span>
                  </div>
                </div>
              </div>
            </li>
          </TransitionGroup>

          <div v-if="cartItems.length === 0" class="flex justify-center items-center md:h-40">
            <p class="text-gray-500 text-xl font-oswald">
              Váš košík je prázdný
            </p>
          </div>
        </div>

        <div v-auto-animate class="border-t border-gray-200 p-4">
          <!-- Slevový kupón -->
          <div min-h-10px>
            <CouponComponent />
          </div>

          <div v-if="discount.isActive" class="flex justify-between text-base font-medium text-gray-900 mb-2">
            <p class="flex items-center">
              Kupón:
              <span class="bg-primary-100 px-2 text-base rounded-md ml-1 font-bold">{{ discount.name }}</span>
              <button class="ml-1" @click="removeDiscount()">
                <i class="pi pi-times hover:text-red-500 transition-colors" />
              </button>
            </p>
            <p class="text-red-600 font-bold">
              -{{ formatPrice(discount.discountedAmount) }}
            </p>
          </div>

          <div class="flex justify-between text-base font-medium text-gray-900 mt-2">
            <p>Mezisoučet</p>
            <p>{{ formatPrice(totalPrice) }}</p>
          </div>

          <p class="mt-1 text-sm text-gray-500">
            Doprava a daně budou vypočítány při pokladně.
          </p>

          <div class="mt-4">
            <NuxtLink :disabled="cartItems.length === 0" @click="redirectToCheckout()">
              <Button :class="cartItems.length === 0 ? 'cursor-disabled opacity-30!' : ''" class="w-full bg-primary-500 text-white py-3 rounded font-medium hover:bg-primary-600 transition-colors">
                Přejít k pokladně
              </Button>
            </NuxtLink>
          </div>

          <div class="mt-3 text-center">
            <p class="text-sm text-gray-500">
              nebo
            </p>
            <button
              class="w-full text-primary-500 py-2 hover:text-primary-700 transition-colors font-medium"
              @click="toggleCart()"
            >
              Pokračovat v nákupu
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Fade animace pro overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide animace pro panel košíku */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Animace pro položky v košíku */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>
