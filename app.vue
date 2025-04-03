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

<style></style>
