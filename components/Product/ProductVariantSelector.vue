<script setup lang=ts>
const props = defineProps<{
  colors: { id: number, name: string, hex: string, available: boolean }[]
  sizes: { id: number, label: string, available: boolean }[]
  row: boolean
}>()
const { selectedColorId, selectedSizeId, isInStock, currentVariant } = storeToRefs(useProduct())

/* const changeColor = (colorId: number) => {
  selectedColorId.value = colorId
  selectedSizeId.value = 0
} */
</script>

<template>
  <div flex :class="row ? 'flex-col items-start' : 'flex items-center'" gap-4>
    <div flex flex-col gap-2>
      <div v-if="row" class="text-lg font-medium text-surface-900">
        Barva
      </div>
      <div flex flex-wrap gap-2 w-full>
        <div
          v-for="color in colors"
          :key="color.id"
          class="w-10 h-10 block flex-shrink-0 rounded-full  cursor-pointer transition-all border-1 duration-300 relative"
          :style="{ backgroundColor: color.hex }"
          :class="[
            selectedColorId === color.id ? 'border-primary-600 border-1 p-3' : 'opacity-70',
            !color.available ? 'opacity-30! saturate-20 cursor-not-allowed' : '',
          ]"
          @click="color.available && (selectedColorId = color.id)"
        >
          <i
            v-if="selectedColorId === color.id"
            :class="color.name?.toLowerCase?.() === 'černá' ? 'text-white' : ''"
            class="pi pi-check absolute top-50% transform -translate-x-1/2 -translate-y-1/2 text-1.2rem left-50% m-auto"
          />
        </div>
      </div>
    </div>

    <div flex flex-col gap-2>
      <div v-if="row" class="text-lg font-medium text-surface-900">
        Velikost
      </div>
      <div flex flex-wrap gap-2>
        <div
          v-for="size in sizes"
          :key="size.id"
          class="h-10 w-10 sm:h-12 sm:w-12 text-surface-900 inline-flex justify-center items-center flex-shrink-0 rounded-md cursor-pointer hover:bg-primary-500 hover:font-600 duration-250 transition-colors"
          :class="[
            selectedSizeId === size.id
              ? 'border-primary-600 bg-primary-500 border-1 text-primary font-600'
              : 'border border-surface-300',
            !size.available ? 'opacity-30 cursor-not-allowed' : '',
          ]"
          @click="size.available && (selectedSizeId = size.id)"
        >
          {{ size.label }}
        </div>
      </div>
    </div>
  </div>
</template>
