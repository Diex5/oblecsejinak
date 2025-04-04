<script setup lang="ts">
const route = useRoute()

useHead({
  title: () => (route.meta.title as string) || '',
  titleTemplate: title => (title ? `OblecSeJinak - ${title}` : 'OblecSeJinak'),
})
</script>

<template>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <template #fallback>
      <SpaLoading />
    </template>
  </ClientOnly>
</template>

<style>
html,
body,
#__nuxt {
  min-height: 100vh;
}

/* Hide arrows in number inputs  */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
