<template>
  <div id="loading fixed top-0 mx-auto left-0 w-full z-9999">
    <NuxtImg format="webp" src="/logo.jpg" class="pulsing" quality="80" />
  </div>
</template>

<style>
#loading{
  display: flex;
  inset: 0;
  position: fixed;
  z-index: 50;
  justify-content: center;
  align-items: center;
}

#loading > img{
  width: 360px;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}

.pulsing {
  animation: pulse 1s infinite linear;
}
</style>
