<script setup lang="ts">
const route = useRoute()

useHead({
  title: () => (route.meta.title as string) || '',
  titleTemplate: title => (title ? `MindfulYou - ${title}` : 'MindfulYou'),
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.p-button{
  @apply bg-red-500 text-white border-none rounded-lg;
}
</style>
