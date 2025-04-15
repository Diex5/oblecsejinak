<template>
  <div class="flex items-start justify-end px-4 py-8 bg-surface-50 dark:bg-surface-950 md:px-6 lg:px-8 relative overflow-hidden min-h-[70rem]">
    <Button
      v-styleclass="{
        selector: '#slideover-cart-ext',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-fadeinright',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-fadeoutright',
        hideOnOutsideClick: true,
      }"
      label="Display"
      icon="pi pi-arrow-left"
      class="!text-xl !leading-none"
    />

    <div id="slideover-cart-ext" class="hidden bg-surface-0 dark:bg-surface-900 absolute top-0 right-0 shadow h-full w-full lg:w-max">
      <div class="flex flex-col h-full">
        <div class="bg-surface-0 dark:bg-surface-900 p-6 flex items-center justify-between">
          <span class="text-surface-900 dark:text-surface-0 text-xl font-medium">Your Cart</span>
          <Button
            v-styleclass="{
              selector: '#slideover-cart-ext',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeoutright',
            }"
            icon="pi pi-times"
            text
            rounded
            class="!text-xl !leading-none"
          />
        </div>
        <div class="flex flex-auto overflow-y-auto">
          <div class="w-full md:w-6/12 p-6 flex flex-col">
            <div class="flex items-start md:items-center border-t border-surface pt-6 mb-6">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-1.png" class="w-16 h-16 sm:w-28 sm:h-28 flex-shrink-0">
              <div class="pl-4 flex-auto">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-primary font-medium">Product Title</span>
                  <a class="cursor-pointer text-primary hover:text-primary-emphasis transition-colors duration-300"><i class="pi pi-trash !text-xl !leading-none" /></a>
                </div>
                <span class="text-surface-500 dark:text-surface-300">Medium</span>
                <div class="flex items-center justify-between mt-2">
                  <InputNumber
                    v-model="quantities[0]"
                    :show-buttons="true"
                    button-layout="horizontal"
                    spinner-mode="horizontal"
                    :min="0"
                    input-class="w-8 md:w-12 text-center py-2 px-1 border-transparent"
                    decrement-button-class="p-button-text py-1 px-1"
                    increment-button-class="p-button-text py-1 px-1"
                    increment-button-icon="pi pi-plus"
                    decrement-button-icon="pi pi-minus"
                    increment-button-icon-class="!text-xl !leading-none"
                    decrement-button-icon-class="!text-xl !leading-none"
                  />
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$20.00</span>
                </div>
              </div>
            </div>
            <div class="bg-surface-50 dark:bg-surface-800 p-4 flex items-center rounded-border">
              <Checkbox v-model="checked" :binary="true" />
              <span class="ml-2 text-surface-900 dark:text-surface-0">Add Warranty</span>
              <span class="text-surface-900 dark:text-surface-0 font-medium ml-auto">$5.00</span>
            </div>
            <div class="border-t border-b border-surface mt-6 py-6">
              <ul class="list-none m-0 p-0">
                <li class="flex justify-between mb-4">
                  <span class="text-surface-600 dark:text-surface-200">Subtotal</span>
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$20.00</span>
                </li>
                <li class="flex justify-between mb-4">
                  <span class="text-surface-600 dark:text-surface-200">Shipping</span>
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$5.00</span>
                </li>
                <li class="flex justify-between">
                  <span class="text-surface-600 dark:text-surface-200">Total</span>
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$25.00</span>
                </li>
              </ul>
              <Button label="Add Coupon" class="block mx-auto mt-6" text />
            </div>
            <div class="mt-auto">
              <div class="flex items-center justify-between text-xl text-surface-900 dark:text-surface-0">
                <span>Grand Total</span>
                <span>$25.00</span>
              </div>
              <Button label="Place Order" class="w-full mt-6" />
            </div>
          </div>
          <div class="hidden md:block w-6/12 p-6 bg-surface-50 dark:bg-surface-800">
            <div class="text-surface-900 dark:text-surface-0 font-medium mb-6">
              Related Products
            </div>
            <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border shadow flex items-start mb-4">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-2.png" class="w-28 h-28 flex-shrink-0">
              <div class="pl-4">
                <span class="text-primary font-medium">Product Title</span>
                <p class="text-sm text-surface-600 dark:text-surface-200 leading-normal my-2 p-0">
                  In ante metus dictum at tempor commodo.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$10.00</span>
                  <Button icon="pi pi-shopping-cart" rounded class="!text-xl !leading-none" />
                </div>
              </div>
            </div>
            <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border shadow flex items-start mb-4">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-3.png" class="w-28 h-28 flex-shrink-0">
              <div class="pl-4">
                <span class="text-primary font-medium">Product Title</span>
                <p class="text-sm text-surface-600 dark:text-surface-200 leading-normal my-2 p-0">
                  In ante metus dictum at tempor commodo.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$5.00</span>
                  <Button icon="pi pi-shopping-cart" rounded class="!text-xl !leading-none" />
                </div>
              </div>
            </div>
            <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded-border shadow flex items-start mb-4">
              <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/shoppingcart/shopping-cart-5-4.png" class="w-28 h-28 flex-shrink-0">
              <div class="pl-4">
                <span class="text-primary font-medium">Product Title</span>
                <p class="text-sm text-surface-600 dark:text-surface-200 leading-normal my-2 p-0">
                  In ante metus dictum at tempor commodo.
                </p>
                <div class="flex items-center justify-between">
                  <span class="text-surface-900 dark:text-surface-0 font-medium">$8.00</span>
                  <Button icon="pi pi-shopping-cart" rounded class="!text-xl !leading-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import InputNumber from 'primevue/inputnumber'
import { ref } from 'vue'

const quantities = ref([1, 1, 1])
const checked = ref(false)
</script>
