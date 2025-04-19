<script setup lang="ts">
const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 1800, // zvýšeno pro plynulejší přechod
  },
  decimals: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 10,
  },
  digitAnimationDuration: {
    type: Number,
    default: 800, // zvýšeno pro plynulejší animaci číslic
  },
})

const displayValue = ref(props.number)
const oldDigits = ref<string[]>([])
const newDigits = ref<string[]>([])
const isAnimating = ref(false)
const lastDirection = ref<'up' | 'down'>('up')

const formatNumber = (num: number): string[] => {
  return num.toFixed(props.decimals).split('')
}

onMounted(() => {
  oldDigits.value = formatNumber(props.number)
  newDigits.value = formatNumber(props.number)
})

const animateChange = (newNumber: number) => {
  const startValue = displayValue.value
  const changeValue = newNumber - startValue
  lastDirection.value = changeValue > 0 ? 'up' : 'down'
  const startTime = performance.now()
  isAnimating.value = true

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    // Jemnější easing funkce
    const easedProgress = easeOutQuint(progress)

    displayValue.value = startValue + changeValue * easedProgress
    newDigits.value = formatNumber(displayValue.value)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
    else {
      isAnimating.value = false
      oldDigits.value = newDigits.value
    }
  }

  requestAnimationFrame(animate)
}

// Jemnější easing funkce
const easeOutQuint = (x: number): number => {
  return 1 - Math.pow(1 - x, 5)
}

watch(() => props.number, (newVal, oldVal) => {
  if (newVal === oldVal) return
  oldDigits.value = formatNumber(displayValue.value)
  animateChange(newVal)
})

onBeforeUnmount(() => {
  isAnimating.value = false
})
</script>

<template>
  <div class="animated-counter">
    <span
      v-for="(digit, index) in newDigits"
      :key="index"
      class="digit"
      :class="{
        'decimal-point': digit === '.',
        'decimal-comma': digit === ',',
        'changed': isAnimating && oldDigits[index] !== digit,
        'going-up': lastDirection === 'up',
        'going-down': lastDirection === 'down',
      }"
      :data-old="oldDigits[index]"
    >
      {{ digit }}
    </span>
  </div>
</template>

<style scoped>
.animated-counter {
  display: inline-flex;
  font-family: 'Courier New', monospace;
  line-height: 1;
  overflow: hidden;
  height: 1.2em; /* fixní výška pro stabilní rozložení */
}

.digit {
  display: inline-block;
  position: relative;
  transition: all 0.1s ease;
}

.digit.changed {
  position: relative;
  transform-style: preserve-3d;
  perspective: 100px;
}

.digit.changed::before {
  content: attr(data-old);
  position: absolute;
  left: 0;
  top: 0;
  animation:
    fadeOut v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards,
    slideOut v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.digit.going-up.changed {
  animation:
    fadeIn v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards,
    slideInUp v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.digit.going-down.changed {
  animation:
    fadeIn v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards,
    slideInDown v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.digit.going-up.changed::before {
  animation:
    fadeOut v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards,
    slideOutDown v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.digit.going-down.changed::before {
  animation:
    fadeOut v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards,
    slideOutUp v-bind('digitAnimationDuration + "ms"') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.decimal-point,
.decimal-comma {
  animation: none !important;
}

/* Základní animace */
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes fadeOut {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

/* Animace pro pohyb nahoru */
@keyframes slideInUp {
  0% { transform: translateY(30%); }
  100% { transform: translateY(0); }
}

@keyframes slideOutDown {
  0% { transform: translateY(0); }
  100% { transform: translateY(30%); }
}

/* Animace pro pohyb dolů */
@keyframes slideInDown {
  0% { transform: translateY(-30%); }
  100% { transform: translateY(0); }
}

@keyframes slideOutUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-30%); }
}
</style>
