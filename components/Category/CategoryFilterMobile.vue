<script lang="ts" setup>
const { filter } = storeToRefs(useCategoryStore())
interface Option {
  value: string
  label: string
  checked: boolean
}

interface Section {
  id: string
  name: string
  options: Option[]
}

defineProps<{
  mobileFiltersOpen: boolean
  subCategories: { name: string, href: string }[]
  filters: Section[]
}>()
const emit = defineEmits(['close'])
</script>

<template>
  <div>
    <HeadlessTransitionRoot
      as="template"
      :show="mobileFiltersOpen"
    >
      <HeadlessDialog
        class="relative z-40 lg:hidden"
        @close="emit('close')"
      >
        <HeadlessTransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25" />
        </HeadlessTransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <HeadlessTransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="translate-x-full"
          >
            <HeadlessDialogPanel class="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div class="flex items-center justify-between px-4">
                <h2 class="text-lg font-medium text-gray-900">
                  Filters
                </h2>
                <button
                  type="button"
                  class="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  @click="emit('close')"
                >
                  <span class="sr-only">Close menu</span>
                  <UnoIcon
                    class="pi pi-times h-6 w-6"
                    aria-hidden="true"
                  />
                </button>
              </div>

              <!-- Filters -->
              <form class="mt-4 border-t border-gray-200">
                <h3 class="sr-only">
                  Categories
                </h3>
                <ul
                  role="list"
                  class="px-2 py-3 font-medium text-gray-900"
                >
                  <li
                    v-for="category in subCategories"
                    :key="category.name"
                  >
                    <a
                      :href="category.href"
                      class="block px-2 py-3"
                    >{{ category.name }}</a>
                  </li>
                </ul>

                <HeadlessDisclosure
                  v-for="section in filters"
                  :key="section.id"
                  v-slot="{ open }"
                  as="div"
                  class="border-t border-gray-200 px-4 py-6"
                >
                  <h3 class="-mx-2 -my-3 flow-root">
                    <HeadlessDisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
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
                    <div class="space-y-6">
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
                          :for="`filter-mobile-${section.id}-${optionIdx}`"
                          class="ml-3 min-w-0 flex-1 text-gray-500"
                        >{{ option.label }}</label>
                      </div>
                    </div>
                  </HeadlessDisclosurePanel>
                </HeadlessDisclosure>
              </form>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </HeadlessDialog>
    </HeadlessTransitionRoot>
  </div>
</template>

<style>

</style>
