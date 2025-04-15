<script setup lang=ts>
const quantities = ref([1, 1, 1])
const value = ref(null)
const checked2 = ref(true)
const checked3 = ref(true)

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])

const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '67' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '87' },
]

const selectedDeliveryMethod = ref(deliveryMethods[0])
const selectedCity = ref(null)

const { totalItems, removeItem, updateQuantity, clearCart, addToCart, toggleCart } = useCart()
const { cartItems, isCartOpened, totalPrice } = storeToRefs(useCart())

const reversedCartItems = computed(() => [...cartItems.value].reverse())

onMounted(() => {
  if (!totalItems || !totalPrice || totalPrice <= 0) {
    navigateTo('/')
  }
})
watch(totalPrice, newValue => {
  if (!totalItems || newValue <= 0) {
    navigateTo('/')
  }
})
</script>

<template>
  <div container>
    {{ totalPrice }}
    <div class="grid grid-cols-12 gap-4 grid-nogutter">
      <div class="col-span-12 lg:col-span-6 h-full px-6 py-12 md:px-12 lg:px-20">
        <ul class="flex list-none flex-wrap p-0 mb-12">
          <li class="flex items-center text-primary mr-2">
            Cart <i class="pi pi-chevron-right text-surface-500 dark:text-surface-300 !text-sm !leading-none ml-2" />
          </li>
          <li class="flex items-center text-surface-500 dark:text-surface-300 mr-2">
            Information<i class="pi pi-chevron-right text-surface-500 dark:text-surface-300 !text-sm !leading-none ml-2" />
          </li>
          <li class="flex items-center text-surface-500 dark:text-surface-300 mr-2">
            Shipping<i class="pi pi-chevron-right text-surface-500 dark:text-surface-300 !text-sm !leading-none ml-2" />
          </li>
          <li class="flex items-center text-surface-500 dark:text-surface-300 mr-2">
            Payment
          </li>
        </ul>
        <div class="grid grid-cols-12 gap-4 formgrid">
          <div class="col-span-12 field mb-12">
            <span class="text-surface-900  text-2xl block font-medium mb-8"> <UnoIcon
              class="pi pi-envelope text-xl mr-4"
              aria-hidden="true"
            />Contact Information</span>
            <InputText id="email" placeholder="Email" type="text" class="w-full mb-4" />
            <div class="flex items-center">
              <Checkbox id="checkbox-2" v-model="checked2" name="checkbox-2" :binary="true" class="text-surface-900 " />
              <label id="checkbox-2" class="text-surface-900  ml-2">Email me with news and offers</label>
            </div>
          </div>
          <div class="col-span-12 field mb-4">
            <span class="text-surface-900  text-2xl block font-medium mb-8"> <UnoIcon
              class="pi pi-user-edit text-xl mr-4"
              aria-hidden="true"
            />Fakturační údaje</span>
            <Select v-model="selectedCity" :options="cities" placeholder="Country / Region" option-label="name" :show-clear="true" class="w-full" />
          </div>
          <div class="col-span-12 lg:col-span-6 field mb-4">
            <InputText id="name" placeholder="Name" type="text" class="w-full" />
          </div>
          <div class="col-span-12 lg:col-span-6 field mb-4">
            <InputText id="lastname" placeholder="Last Name" type="text" class="w-full" />
          </div>
          <div class="col-span-12 field mb-4">
            <InputText id="address" placeholder="Address" type="text" class="w-full" />
          </div>
          <div class="col-span-12 field mb-4">
            <InputText id="address2" placeholder="Apartment, suite, etc" type="text" class="w-full" />
          </div>
          <div class="col-span-12 lg:col-span-6 field mb-4">
            <InputText id="pc" placeholder="Postal Code" type="text" class="w-full" />
          </div>
          <div class="col-span-12 lg:col-span-6 field mb-4">
            <InputText id="city" placeholder="City" type="text" class="w-full" />
          </div>
          <div class="col-span-12 lg:col-span-6 field mb-4">
            <div class="flex items-center">
              <Checkbox id="checkbox-3" v-model="checked3" name="checkbox-3" :binary="true" class="text-surface-900 " />
              <label id="checkbox-3" class="text-surface-900  ml-2">Save for next purchase</label>
            </div>
          </div>
          <div col-span-12>
            <div class=" border-t border-gray-200 w-full pt-4">
              <fieldset class="">
                <span class="text-surface-900  text-2xl block font-medium mb-8"> <UnoIcon class="pi pi-truck text-xl mr-4" aria-hidden="true" />Fakturační údaje</span>
                <HeadlessRadioGroup v-model="selectedDeliveryMethod" class="mt-4 grid grid-cols-1 w-full gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <HeadlessRadioGroupOption v-for="deliveryMethod in deliveryMethods" :key="deliveryMethod.id" v-slot="{ active, checked }" as="template" :value="deliveryMethod" :aria-label="deliveryMethod.title" :aria-description="`${deliveryMethod.turnaround} for ${deliveryMethod.price}`">
                    <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-indigo-500' : '', 'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none']">
                      <span class="flex flex-1">
                        <span class="flex flex-col">
                          <span class="block text-sm font-medium text-gray-900">{{ deliveryMethod.title }}</span>
                          <span class="mt-1 flex items-center text-sm text-gray-500">{{ deliveryMethod.turnaround }}</span>
                          <span class="mt-6 text-sm font-medium text-gray-900">{{ deliveryMethod.price }}</span>
                        </span>
                      </span>
                      <CheckCircleIcon v-if="checked" class="size-5 text-indigo-600" aria-hidden="true" />
                      <span :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']" aria-hidden="true" />
                    </div>
                  </HeadlessRadioGroupOption>
                </HeadlessRadioGroup>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="col-span-12 flex flex-col lg:flex-row justify-center items-center lg:justify-end mt-12">
          <Button class="mt-4 lg:mt-0 w-full lg:w-auto lg:px-12 order-2 lg:order-1 lg:mr-6" label="Return to Cart" text />
          <Button class="w-full lg:w-auto lg:px-12 order-1 lg:order-2" label="Continue to Shipping" />
        </div>
      </div>
      <div md:sticky top-0 left-0 class="col-span-12 lg:col-span-6 px-6 py-20 md:px-12 lg:px-20 bg-surface-50 ">
        <div class="border-b pb-4 border-surface">
          <span class="text-surface-900  font-medium text-xl">Your Cart</span>
        </div>
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
                    @update:model-value="updateQuantity(cart.productId, cart.variantId, cart.quantity, cart.max_quantity)"
                  />
                  <span class="text-surface-900  font-medium">{{ formatPrice(cart.price * cart.quantity) }}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="py-2 mt-4 border-b border-surface">
          <InputGroup class="mb-4">
            <InputText v-model="value" type="text" placeholder="Promo code" class="w-full" />
            <Button label="Apply" :disabled="!value" />
          </InputGroup>
        </div>
        <div v-auto-animate md:sticky top-0 left-0 w-full class="py-2 my-4 text-lg">
          <div class="flex items-center justify-between border-b-dotted border-b-2">
            <span class="text-surface-900  font-medium">Mezisoučet</span>
            <span class="text-surface-900 ">{{ formatPrice(totalPrice) }}</span>
          </div>
          <div class="flex items-center justify-between border-b-dotted border-b-2">
            <span class="text-surface-900  font-medium py-1 ">Kupón: <b bg-primary-100 px-2 text-base rounded-md> DWA24FA2025</b><UnoIcon class="pi pi-times hover:text-red-500 text-base ml-2 transition-all duration-250 cursor-pointer mr-4" aria-hidden="true" /></span>
            <span class="text-surface-900 text-red-600 font-bold">-153 Kč </span>
          </div>
          <div class="flex items-center justify-between mb-2 border-b-dotted border-b-2">
            <span class="text-surface-900  font-medium"> <UnoIcon class="pi pi-truck" aria-hidden="true" /> {{ selectedDeliveryMethod.title }}</span>
            <span class="text-primary ">{{ formatPrice(Number(selectedDeliveryMethod.price)) }}</span>
          </div>
          <div class="flex items-center justify-between mb-4 border-t-2 border-black pt-2">
            <span class="text-surface-900  font-bold">Celkem to činí</span>
            <span class="text-surface-900  font-medium text-xl">{{ formatPrice(totalPrice + Number(selectedDeliveryMethod.price)) }}</span>
          </div>
        </div>
        <div class="py-2 mt-4 bg-highlight flex items-center justify-center">
          <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/checkoutform/checkoutform-1-3.png" class="mr-2" alt="Country Flag"><span
            class="text-highlight-contrast font-medium"
          >100% Garance vrácení peněz, bez otázek do 30 dnů</span>
        </div>
      </div>
    </div>

    <!--  <div class="bg-surface-900 dark:bg-surface-0 py-12 lg:py-6 md:px-12 lg:px-20 flex flex-col lg:flex-row justify-between items-center">
      <ul class="list-none mb-0 flex flex-col md:flex-row order-1 lg:order-none mt-6 lg:mt-0">
        <li class="mr-6 mt-4 lg:mt-0">
          <a tabindex="0" class="cursor-pointer text-surface-0 dark:text-surface-900">Investor Relations</a>
        </li>
        <li class="mr-6 mt-4 lg:mt-0">
          <a tabindex="0" class="cursor-pointer text-surface-0 dark:text-surface-900">Data Privacy</a>
        </li>
        <li class="mr-6 mt-4 lg:mt-0">
          <a tabindex="0" class="cursor-pointer text-surface-0 dark:text-surface-900">Terms of Service</a>
        </li>
        <li class="mr-6 mt-4 lg:mt-0">
          <a tabindex="0" class="cursor-pointer text-surface-0 dark:text-surface-900">Legal Information</a>
        </li>
      </ul>

      <div class="flex items-center order-none lg:order-1 gap-4">
        <a tabindex="0" class="cursor-pointer">
          <i class="pi pi-facebook bg-surface-0  p-1 !text-lg !leading-[normal] rounded-full text-surface-900 " />
        </a>
        <a tabindex="0" class="cursor-pointer">
          <i class="pi pi-twitter bg-surface-0  p-1 !text-lg !leading-[normal] rounded-full text-surface-900 " />
        </a>
        <a tabindex="0" class="cursor-pointer">
          <i class="pi pi-youtube bg-surface-0  p-1 !text-lg !leading-[normal] rounded-full text-surface-900 " />
        </a>
        <a tabindex="0" class="cursor-pointer">
          <i class="pi pi-google bg-surface-0  p-1 !text-lg !leading-[normal] rounded-full text-surface-900 " />
        </a>
      </div>
    </div> -->
  </div>
</template>
