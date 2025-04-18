<template>
  <div class="loader-overlay">
    <div class="loader-content">
      <ProgressSpinner
        stroke-width="4"
        animation-duration=".8s"
        aria-label="Načítání"
      />
      <p class="loading-text">
        Zpracovávám<span class="dots">{{ dots }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const dots = ref('')
let intervalId

onMounted(() => {
  document.body.style.overflow = 'hidden'

  intervalId = setInterval(() => {
    dots.value = dots.value.length < 3 ? dots.value + '.' : ''
  }, 500)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  clearInterval(intervalId)
})
</script>

  <style scoped>
  .loader-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
  }

  .loader-content {
    text-align: center;
    color: white;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    animation: fadeIn 0.4s ease-in-out;
  }

  .loading-text {
    margin-top: 1rem;
    font-size: 1.2rem;
    letter-spacing: 1px;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  </style>
