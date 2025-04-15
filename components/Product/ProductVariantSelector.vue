<script setup lang=ts>
const props = defineProps<{
  colors: { id: number, name: string, hex: string, available: boolean }[]
  sizes: { id: number, label: string, available: boolean }[]
  row: boolean
}>()
const { selectedColorId, selectedSizeId, isInStock, currentVariant, quantity } = storeToRefs(useProduct())

/* const changeColor = (colorId: number) => {
  selectedColorId.value = colorId
  selectedSizeId.value = 0
} */

watch(() => currentVariant.value, () => {
  quantity.value = 1
})
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
            selectedColorId === color.id ? 'ring-offset-1 ring-3 ring-primary-600 p-3' : 'opacity-70',
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
          class="h-10 w-10 sm:h-12 sm:w-12 text-surface-900 inline-flex justify-center items-center flex-shrink-0 rounded-md cursor-pointer hover:border-primary-600  hover:border-3 hover:font-600 duration-250 transition-colors"
          :class="[
            selectedSizeId === size.id
              ? 'border-primary-600  border-3 text-primary font-600'
              : 'border border-surface-300',
            !size.available ? 'opacity-30 cursor-not-allowed' : '',
          ]"
          @click="size.available && (selectedSizeId = size.id)"
        >
          {{ size.label }}
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 " :class="row ? 'w-full' : 'w-fit'">
      <div v-if="row" class="text-lg font-medium w-full flex justify-between text-surface-900">
        Množství
        <div class="stock-status ">
          <span v-if="isInStock" class="text-green-600">
            <span class="font-medium">Na skladě:</span> {{ currentVariant?.stock }} ks
          </span>
          <span v-else class="text-red-600 font-medium">Není skladem</span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <InputNumber
          v-model="quantity"
          :show-buttons="true"
          button-layout="horizontal"
          spinner-mode="horizontal"
          :min="1"
          :max="currentVariant?.stock || 1"
          class="w-32"
          input-class="w-12 font-bold text-center"
          decrement-button-class="p-button-text"
          increment-button-class="p-button-text"
          increment-button-icon="pi pi-plus"
          decrement-button-icon="pi pi-minus"
        />
      </div>
    </div>
  </div>
</template>
