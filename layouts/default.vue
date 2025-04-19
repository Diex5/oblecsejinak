<script lang=ts setup>
</script>

<template>
  <div font-sans>
    <NavigationBar />
    <NuxtLoadingIndicator />
    <div>
      <Toast />
      <slot />
    </div>

    <!--  <Footer /> -->
  </div>
</template>

<style></style>
