<script setup lang="ts">
defineProps<{
  benefits: {
    id: number
    product_id: number
    title: string
    content: string
    sort_order?: number | null // Volitelné a může být null
    icon?: string | null // Volitelné a může být null
  }[]
}>()

const colors = [
  'text-cyan-500',
  'text-purple-500',
  'text-yellow-800',
  'text-blue-500',
  'text-indigo-500',
  'text-red-500',
]
</script>

<template>
  <div flex flex-col>
    <ul class="list-none w-full flex mt-4 flex-col items-start justify-start md:text-lg text-base p-0 m-0 font-medium text-surface-600 bg-primary-50/20  rounded-lg md:py-6  shadow-sm">
      <li
        v-for="(benefit, index) in benefits"
        :key="index"
        v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }"
        pl-1rem
        class="flex flex-col items-start px-0! mb-4 last:mb-0"
      >
        <div flex items-center gap-1>
          <!-- Dynamická barva pro ikonu -->
          <i :class="[benefit.icon, colors[index % colors.length]]" class="mr-3" />
          <!-- Dynamická barva pro nadpis -->
          <span font-bold :class="colors[index % colors.length]" text-lg>{{ benefit.title }}</span>
        </div>
        <span class="font-400!">{{ benefit.content }}</span>
      </li>
    </ul>
  </div>
</template>
