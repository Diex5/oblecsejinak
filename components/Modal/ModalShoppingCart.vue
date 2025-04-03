<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { isCartOpened, cartItems, totalPrice } = storeToRefs(useCart())
const { removeFromCart, toggleCart } = useCart()
</script>

<template>
  <HeadlessTransitionRoot as="template" :show="isCartOpened">
    <HeadlessDialog class="relative z-10" @close="isCartOpened = false">
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
                        <ul role="list" class="-my-6 divide-y divide-gray-200 min-h-[300px] w-full">
                          <TransitionGroup name="list">
                            <!-- qs -->
                            <li v-for="cart in cartItems" :key="cart.id" class="flex py-6">
                              {{ cart }}
                            </li>
                          </TransitionGroup>
                        </ul>
                      </div>
                      <!-- Slevový kupón -->
                      <div class="mt-6 pt-4 border-t border-gray-200">
                        <div class="flex items-center">
                          <input
                            type="text"
                            placeholder="Slevový kód"
                            class="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                          <button
                            type="button"
                            class="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            Použít
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Patička s cenou a tlačítky -->
                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Mezisoučet</p>
                      <p>{{ totalPrice }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Doprava a daně budou vypočítány při pokladně.
                    </p>
                    <div class="mt-6">
                      <I18nLink to="/pokladna">
                        <Button v-ripple class="w-full" label="Přejít k pokladně" size="large" />
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
}

.list-move {
  transition: transform 0.5s ease;
}
</style>
