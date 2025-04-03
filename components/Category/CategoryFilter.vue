<template>
  <div class="bg-white h-100vh">
    <div>
      <CategoryFilterMobile
        :mobile-filters-open="mobileFiltersOpen"
        :filters="filters"
        :sub-categories="subCategories"
        @close="mobileFiltersOpen = false"
      />

      <main class="app-container">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <div class="flex items-center">
            <HeadlessMenu
              as="div"
              class="relative inline-block text-left"
            >
              <div>
                <HeadlessMenuButton class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <UnoIcon
                    class="-mr-1 ml-1 w-5 h-5 shrink-0 text-gray-400 group-hover:text-gray-500 pi
                      pi-angle-down"
                    aria-hidden="true"
                  />
                </HeadlessMenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <HeadlessMenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                  <div class="py-1">
                    <HeadlessMenuItem
                      v-for="option in sortOptions"
                      :key="option.name"
                      v-slot="{ active }"
                    >
                      <a
                        :href="option.href"
                        :class="[option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100 outline-none' : '', 'block px-4 py-2 text-sm']"
                      >{{ option.name }}</a>
                    </HeadlessMenuItem>
                  </div>
                </HeadlessMenuItems>
              </transition>
            </HeadlessMenu>

            <button
              type="button"
              class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span class="sr-only">View grid</span>
              <UnoIcon
                class="w-5 h-5 pi
                  pi-th-large"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              @click="mobileFiltersOpen = true"
            >
              <span class="sr-only">Filters</span>
              <UnoIcon
                class="w-5 h-5 pi
                  pi-filter"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <section
          aria-labelledby="products-heading"
          class="pb-24 pt-6"
        >
          <h2
            id="products-heading"
            class="sr-only"
          >
            Products
          </h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <h3 class="sr-only">
                Categories
              </h3>
              <ul
                role="list"
                class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
              >
                <li
                  v-for="category in subCategories"
                  :key="category.name"
                >
                  <a :href="category.href">{{ category.name }}</a>
                </li>
              </ul>

              <div v-auto-animate>
                <HeadlessDisclosure
                  v-for="section in filters"
                  :key="section.id"
                  v-slot="{ open }"
                  v-auto-animate
                  as="div"
                  class="border-b border-gray-200 py-6"
                >
                  <h3

                    class="-my-3 flow-root"
                  >
                    <HeadlessDisclosureButton class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span class="font-medium text-gray-900">{{ section.name }}</span>
                      <span class="ml-6 flex items-center">
                        <UnoIcon
                          v-if="!open"
                          class="w-5 h-5 pi
                          pi-plus"
                          aria-hidden="true"
                        />
                        <UnoIcon
                          v-else
                          class="w-5 h-5 pi
                          pi-minus"
                          aria-hidden="true"
                        />
                      </span>
                    </HeadlessDisclosureButton>
                  </h3>
                  <HeadlessDisclosurePanel class="pt-6">
                    <div class="space-y-4 ">
                      <div
                        v-for="(option, optionIdx) in section.options"
                        :key="option.value"
                        class="flex items-center"
                      >
                        <Checkbox
                          v-model="filter[section.id]"
                          :input-id="String(optionIdx)"
                          name="color"
                          :value="option.value"
                        />
                        <label
                          :for="`filter-${section.id}-${optionIdx}`"
                          class="ml-3 text-sm text-gray-600"
                        >{{ option.label }}</label>
                      </div>
                    </div>
                  </HeadlessDisclosurePanel>
                </HeadlessDisclosure>
              </div>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <slot />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang=ts>
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
]
const { filter } = storeToRefs(useCategoryStore())
const mobileFiltersOpen = ref(false)
</script>
