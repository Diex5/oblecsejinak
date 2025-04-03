<script lang=ts setup>
const { isCartOpened } = storeToRefs(useCart())
</script>

<template>
  <div font-sans>
    <Navigation />
    <NuxtLoadingIndicator />
    <div>
      <slot />
    </div>
    <!--  <Footer /> -->
  </div>
</template>

<style></style>
