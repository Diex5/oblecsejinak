<script setup>
import Button from 'primevue/button'
import { computed, ref } from 'vue'

const hoveredItem = ref(null)
const selectedItem = ref(null)

const activeItem = computed(() => hoveredItem.value || selectedItem.value)
const { toggleCart } = useCart()
const setActiveItem = item => {
  if (item?.subMenu) {
    hoveredItem.value = item
    selectedItem.value = item
  }
  else {
    hoveredItem.value = null
    selectedItem.value = null
  }
}

const navs = ref([
  {
    label: 'Women',
    to: '',
    subMenu: [
      {
        label: 'Clothing',
        categories: [
          { to: '', label: 'Shirts & Tops' },
          { to: '', label: 'Sweatshirts' },
          { to: '', label: 'Leggings' },
          { to: '', label: 'Underwear' },
          { to: '', label: 'Activewear' },
        ],
      },
      {
        label: 'Shoes',
        categories: [
          { to: '', label: 'Shoes' },
          { to: '', label: 'Backpacks' },
          { to: '', label: 'Jewelry' },
          { to: '', label: 'Belts' },
          { to: '', label: 'Wallets' },
        ],
      },
      {
        label: 'Accessories',
        categories: [
          { to: '', label: 'Skinny' },
          { to: '', label: 'Straight' },
          { to: '', label: 'Relaxed' },
          { to: '', label: 'Skirt' },
          { to: '', label: 'Shorts' },
        ],
      },
      {
        label: 'Jewelry',
        categories: [
          { to: '', label: 'Anklets' },
          { to: '', label: 'Bracelets' },
          { to: '', label: 'Earnings' },
          { to: '', label: 'Necklaces' },
          { to: '', label: 'Rings' },
        ],
      },
    ],
  },
  {
    label: 'Men',
    to: '',
  },
  {
    label: 'Kids',
    to: '',
  },
])

const navigationFooter = ref([
  {
    title: 'Cras tincidunt lobortis',
    description: 'Amet cursus sit amet dictum',
    image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/storenavigation/storenavigation-4-1.jpeg',
    to: '',
  },
  {
    title: 'Nunc faucibus',
    description: 'Vitae purus faucibus',
    image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/storenavigation/storenavigation-4-2.jpeg',
    to: '',
  },
  {
    title: 'Tincidunt ornare massa',
    description: 'Enim diam vulputate ut',
    image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/storenavigation/storenavigation-4-3.jpeg',
    to: '',
  },
  {
    title: 'Fames ac turpis egestas',
    description: 'Volutpat diam ut',
    image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/storenavigation/storenavigation-4-4.jpeg',
    to: '',
  },
])
</script>

<template>
  <nav
    class="relative w-full flex items-center px-8 lg:px-20 gap-6 bg-surface-0 dark:bg-surface-950 border-b border-surface py-6 lg:py-0"
    @mouseleave="hoveredItem = null"
  >
    <a href="#" class="relative z-20 flex items-center gap-4">
      <svg
        class="fill-surface-900 dark:fill-surface-0" width="35" height="35" viewBox="0 0 35 35" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_5646_32453)">
          <path
            fill-rule="evenodd" clip-rule="evenodd"
            d="M22.3612 10.2246C22.3185 10.1961 22.2755 10.1679 22.2324 10.1402C19.9097 8.64667 17.5 6.51142 17.5 3.75V0C20.9611 0 24.3446 1.02636 27.2225 2.94928C30.1004 4.8722 32.3433 7.60533 33.6679 10.803C34.9924 14.0007 35.339 17.5194 34.6637 20.9141C33.9885 24.3087 32.3218 27.427 29.8743 29.8743C27.427 32.3218 24.3087 33.9885 20.9141 34.6637C17.5194 35.339 14.0007 34.9924 10.803 33.6679C7.60533 32.3433 4.8722 30.1004 2.94928 27.2225C1.02636 24.3446 0 20.9611 0 17.5H3.75C6.51142 17.5 8.64667 19.9097 10.1402 22.2324C10.1679 22.2755 10.1961 22.3185 10.2246 22.3612C11.1861 23.8002 12.5527 24.9217 14.1516 25.584C15.7504 26.2462 17.5097 26.4195 19.207 26.0818C20.9044 25.7442 22.4634 24.9109 23.6872 23.6872C24.9109 22.4634 25.7442 20.9044 26.0818 19.207C26.4195 17.5097 26.2462 15.7504 25.584 14.1516C24.9217 12.5527 23.8002 11.1861 22.3612 10.2246Z"
          />
          <path
            fill-rule="evenodd" clip-rule="evenodd"
            d="M9.75 3.35672e-06C9.19771 3.59593e-06 8.7559 0.449155 8.69291 0.997837C8.60035 1.80427 8.39582 2.59555 8.08395 3.34848C7.64421 4.41008 6.9997 5.37467 6.18718 6.18719C5.37467 6.99971 4.41008 7.64422 3.34848 8.08395C2.59554 8.39582 1.80427 8.60035 0.997834 8.69292C0.449152 8.7559 3.62901e-07 9.19772 3.3876e-07 9.75L0 17.5C2.29813 17.5 4.57376 17.0474 6.69697 16.1679C8.82017 15.2884 10.7494 13.9994 12.3743 12.3743C13.9994 10.7494 15.2884 8.82018 16.1679 6.69696C17.0474 4.57376 17.5 2.29813 17.5 0L9.75 3.35672e-06Z"
          />
        </g>
        <defs>
          <clipPath id="clip0_5646_32453">
            <rect width="35" height="35" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <div class="text-surface-900 dark:text-surface-0 text-lg font-semibold">BriteMank</div>
    </a>

    <a
      v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        leaveToClass: 'hidden',
        hideOnOutsideClick: true,
      }" class="relative z-20 cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-0 ml-auto"
    >
      <i class="pi pi-bars !text-3xl !leading-none" />
    </a>
    <div
      class="border-b border-surface lg:border-0 animate-fadeinup absolute lg:relative bg-surface-0 dark:bg-surface-900 lg:bg-transparent lg:dark:bg-transparent w-full top-0 left-0 pt-14 pb-4 lg:py-0 hidden lg:flex flex-1 items-center"
    >
      <ul
        class="max-h-[560px] overflow-auto lg:overflow-visible border-y py-4 lg:py-0 mt-6 lg:mt-0 border-surface lg:border-0 select-none relative flex-1 flex lg:flex-row flex-col lg:mb-0 mb-4 lg:items-center gap-2 lg:gap-6"
      >
        <template v-for="(item, index) of navs" :key="index">
          <li
            class="cursor-pointer font-medium" @mouseenter="setActiveItem(item)"
            @click="setActiveItem(item)"
          >
            <a
              v-if="item?.subMenu" v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                leaveToClass: 'hidden',
                hideOnOutsideClick: true,
              }" :class="activeItem?.label === item.label ? 'border-surface-900 dark:border-surface-0' : 'border-transparent '"
              class="group text-surface-700 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-0 relative lg:border-b px-8 py-4 lg:p-8 transition-all flex items-center justify-between gap-2"
            >
              {{ item.label }}
              <i class="pi pi-chevron-down lg:hidden !text-xl !leading-none" />
              <span
                :class="activeItem?.label === item.label ? 'opacity-100' : 'opacity-0'"
                class="z-[999] hidden lg:block absolute top-full left-1/2 -translate-x-1/2 transition-all border-l-[6px] border-l-transparent border-r-[6px] border-transparent border-t-[6px] border-t-surface-900 dark:border-t-surface-0"
              />
            </a>
            <a
              v-else
              class="px-8 py-4 lg:p-8 transition-all flex text-surface-700 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-0"
              :href="item.to"
            >{{ item.label }}</a>
            <div v-if="item?.subMenu" class="lg:hidden pl-12 hidden animate-fadein">
              <ul class="flex flex-col gap-6 my-2">
                <template v-for="(subItem, j) of item.subMenu" :key="j">
                  <li>
                    <span class="font-medium">{{ subItem.label }}</span>
                    <div class="flex flex-col mt-6 gap-4 pl-6">
                      <template v-for="(category, k) of subItem.categories" :key="k">
                        <a
                          :href="category.to"
                          class="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-0"
                        >{{
                          category.label }}</a>
                      </template>
                    </div>
                  </li>
                </template>
              </ul>
            </div>
          </li>
        </template>
      </ul>
      <div class="flex items-center justify-start lg:justify-center gap-2 px-8 lg:px-0">
        <Button
          icon="pi pi-search" text
          class="text-surface-900 dark:text-surface-0 [&>.p-button-icon]:!text-xl [&>.p-button-icon]:!leading-none"
          severity="secondary"
        />
        <Button
          icon="pi pi-heart" text
          class="text-surface-900 dark:text-surface-0 [&>.p-button-icon]:!text-xl [&>.p-button-icon]:!leading-none"
          severity="secondary"
        />
        <Button
          icon="pi pi-user" text
          class="text-surface-900 dark:text-surface-0 [&>.p-button-icon]:!text-xl [&>.p-button-icon]:!leading-none"
          severity="secondary"
        />
        <Button
          icon="pi pi-cart-plus"
          text class="text-surface-900 dark:text-surface-0 [&>.p-button-icon]:!text-xl [&>.p-button-icon]:!leading-none"
          severity="secondary"
          @click="toggleCart()"
        />
      </div>
    </div>
    <div
      v-if="activeItem?.subMenu"
      :class="activeItem ? 'opacity-100 visible z-[99]' : 'opacity-0 invisible z-[-99]'"
      class="px-20 pt-12 pb-20 lg:block hidden animate-fadein animate-duration-150 w-full absolute top-full left-0 overflow-hidden bg-surface-0 dark:bg-surface-900 transition-all shadow-[0px_12px_24px_0px_rgba(0,0,0,0.06)] border-t border-surface"
    >
      <ul class="flex-1 grid grid-cols-4 gap-6 overflow-hidden">
        <template v-for="(subItem, j) of activeItem?.subMenu" :key="j">
          <li class="flex-1">
            <span class="text-xl font-bold text-surface-900 dark:text-surface-0">{{ subItem.label
            }}</span>
            <div class="flex flex-col mt-8 gap-4">
              <template v-for="(category, k) of subItem.categories" :key="k">
                <a
                  :href="category.to"
                  class="text-surface-700 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0"
                >{{
                  category.label }}</a>
              </template>
            </div>
          </li>
        </template>
      </ul>
      <div class="flex items-center gap-6 mt-8">
        <template v-for="(footerItem, j) of navigationFooter" :key="j">
          <div class="overflow-hidden rounded-xl relative flex-1 h-64">
            <div
              class="z-10 p-4 flex items-end absolute top-0 left-0 inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
            >
              <div class="flex items-center gap-4 w-full">
                <div class="flex-1">
                  <div class="font-semibold text-surface-0">
                    {{ footerItem.title }}
                  </div>
                  <p class="text-sm mt-1 text-surface-200">
                    {{ footerItem.description }}
                  </p>
                </div>
                <button
                  class="w-9 h-9 rounded-full border border-surface-0 flex items-center justify-center hover:bg-surface-0/20 transition-all"
                >
                  <i class="pi pi-arrow-right text-surface-0 !text-xl !leading-none" />
                </button>
              </div>
            </div>
            <img class="w-full h-full object-cover" :src="footerItem.image" alt="Footer Item">
          </div>
        </template>
      </div>
    </div>
    <ModalShoppingCart />
  </nav>
</template>
