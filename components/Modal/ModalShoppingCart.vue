<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { totalItems, removeItem, updateQuantity, clearCart, addToCart, toggleCart } = useCart()
const { cartItems, isCartOpened, totalPrice } = storeToRefs(useCart())

const reversedCartItems = computed(() => [...cartItems.value].reverse())

const qtn = ref()
</script>

<template>
  <ClientOnly>
    <HeadlessTransitionRoot as="template" :show="isCartOpened">
      <HeadlessDialog class="relative z-999" @close="isCartOpened = false">
        <!-- Překrytí pozadí -->
        <HeadlessTransitionChild
          as="template"
          :show="isCartOpened"
          enter="ease-in-out duration-500"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in-out duration-500"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <!-- Panel košíku -->
              <HeadlessTransitionChild
                as="template"
                :show="isCartOpened"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enter-from="translate-x-full"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                leave-to="translate-x-full"
              >
                <HeadlessDialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <!-- Hlavička -->
                      <div class="flex items-start justify-between">
                        <HeadlessDialogTitle class="text-lg font-medium text-gray-900">
                          Košík
                        </HeadlessDialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            @click="isCartOpened = false"
                          >
                            <span class="absolute -inset-0.5" />
                            <span class="sr-only">Zavřít panel</span>
                            <UnoIcon class="pi pi-times h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div class="mt-8">
                        <div class="flow-root">
                          <!-- Seznam položek košíku -->
                          <ul v-auto-animate class="-my-6 divide-y divide-gray-200 min-h-[300px] w-full">
                            <!-- qs -->
                            <li v-for="(cart, index) in reversedCartItems" :key="index" class="flex py-6" w-full>
                              <div class="flex items-start md:items-center border-t w-full border-surface pt-6 mb-6">
                                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-1.png" class="w-20 h-20 flex-shrink-0">
                                <div class="pl-4 flex-auto">
                                  <div class="flex items-center justify-between ">
                                    <span class="text-primary font-medium">{{ cart.name }}</span>
                                    <a class="cursor-pointer text-primary hover:text-primary-emphasis transition-colors duration-300" @click="removeItem(cart.productId, cart.variantId)"><i class="pi pi-trash !text-xl !leading-none" /></a>
                                  </div>
                                  <div flex items-center gap-2>
                                    <div w-3 h-3 rounded-full :style="{ backgroundColor: cart.color.hex_code }" />
                                    <span class="text-surface-500 text-lg">{{ cart.size.name }}</span>
                                  </div>
                                  <div class="flex items-center justify-between mt-2">
                                    <InputNumber
                                      v-model="cart.quantity"
                                      :show-buttons="true"
                                      button-layout="horizontal"
                                      spinner-mode="horizontal"
                                      :min="1"
                                      :max="cart.max_quantity"
                                      input-class="w-8 md:w-12 font-bold text-center bg-gray-50! "
                                      decrement-button-class="p-button-text"
                                      increment-button-class="p-button-text "
                                      increment-button-icon="pi pi-plus"
                                      decrement-button-icon="pi pi-minus"
                                      increment-button-icon-class="!text-base !leading-none"
                                      decrement-button-icon-class="!text-xs !leading-none"
                                      @update:model-value=" updateQuantity(cart.productId, cart.variantId, cart.quantity, cart.max_quantity)"
                                    />
                                    <span class="text-surface-900 dark:text-surface-0 font-medium">{{ formatPrice(cart.price) }}</span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div class="bg-surface-50 dark:bg-surface-800 p-4 flex items-center rounded-border">
                            <Checkbox :binary="true" />
                            <span class="ml-2 text-surface-900 dark:text-surface-0">Add Warranty</span>
                            <span class="text-surface-900 dark:text-surface-0 font-medium ml-auto">$5.00</span>
                          </div>
                        </div>
                      <!-- Slevový kupón -->
                      </div>
                    </div>

                    <!-- Patička s cenou a tlačítky -->
                    <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <CouponComponent />
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <p>Mezisoučet</p>
                        <p>{{ formatPrice(totalPrice) }}</p>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        Doprava a daně budou vypočítány při pokladně.
                      </p>
                      <div class="mt-6">
                        <I18nLink to="/pokladna">
                          <Button v-ripple variant="primary" class="w-full bg-primary-500 text-gray-700" label="Přejít k pokladně" size="large" />
                        </I18nLink>
                      </div>
                      <div class="mt-6 flex justify-center text-center text-sm text-gray-500 w-full">
                        <p class="w-full flex flex-col gap-[4px]">
                          nebo
                          <Button label="Pokračovat v nákupu" variant="text" class="w-full" @click="toggleCart()" />
                        </p>
                      </div>
                    </div>
                  </div>
                </HeadlessDialogPanel>
              </HeadlessTransitionChild>
            </div>
          </div>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </ClientOnly>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
  z-index: -1; /* Přidáno - zajistí, že odstraňovaný prvek bude pod ostatními */
}

.list-move {
  transition: transform 0.5s ease;
  position: relative; /* Přidáno - zajistí lepší relativní pohyb */
  z-index: 1; /* Přidáno - zajistí, že pohybující se prvky budou nad odstraňovanými */
}
</style>
