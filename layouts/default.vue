<script lang=ts setup>
</script>

<template>
  <div font-sans>
    <NavigationBar />
    <NuxtLoadingIndicator />
    <div>
      <Toast />
      <slot />
      <ModalShoppingCart />
    </div>

    <!--  <Footer /> -->
  </div>
</template>

<style></style>
