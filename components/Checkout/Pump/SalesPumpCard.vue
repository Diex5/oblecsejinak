<script lang="ts" setup>
const props = defineProps<{
  id: string
  title: string
  price: number
  description: string
  url?: string
}>()
const { toggleUpsell } = useCheckoutStore()

const isChecked = ref(false)

watch(isChecked, newValue => {
  toggleUpsell(props.id, props.price, props.title)
})
</script>

<template>
  <div flex flex-col gap-2 border-3 p-4 border-primary-800 border-dashed max-w-450px rounded-md>
    <div
      class="flex items-center gap-2" p-1 cursor-pointer bg-primary-100 hover:bg-green-200 transition-all
      rounded-md w-full
    >
      <Checkbox
        v-model="isChecked" w-fit input-id="size_large" cursor-pointer :name="`${id}`" value="Large"
        size="large"
      />
      <label class="text-xl" text-left cursor-pointer>Ano, chci i
        tohle</label>
    </div>
    <div flex flex-col gap-1>
      <div w-full justify-between flex text-primary-500 font-500>
        <div text-left>
          {{ title }}
        </div>
        <div text-right>
          {{ price }}
        </div>
      </div>
      <div text-left max-w="80%">
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia dolorem labore corrupti atque,
          tempora
          praesentium iusto possimus illo dicta error porro maxime nisi commodi odio enim cum, autem ut
          impedit.
        </span>
      </div>
    </div>
  </div>
</template>
