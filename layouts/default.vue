<script lang=ts setup>
</script>

<template>
  <div font-sans>
    <Navigation />
    <NuxtLoadingIndicator />
    <ClientOnly>
      <template #fallback>
        <SpaLoading />
      </template>
      <div>
        <slot />
      </div>
    </ClientOnly>

    <!--  <Footer /> -->
  </div>
</template>

<style></style>
