<script setup lang="ts">
const emits = defineEmits(['pay', 'skip'])
</script>

<template>
  <div class="flex justify-center">
    <div
      class="border-2 p-4 h-full flex-col border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
    >
      Upsell1

      <h2 text-2rem>
        Jak přestat Overthinkovat a začít se radovat jednou provždy
      </h2>
      <div flex flex-col>
        <Button size="large" @click="emits('pay')">
          Přidat do objednávky
        </Button>
        <span font-normal text-sm>Kliknutím na tlačítko přidáte do objednávky BONUS v hodnotě 1 197Kč</span>
      </div>
      <Button variant="text" severity="secondary" underline size="small" @click="emits('skip')">
        <span
          text-xs
        >Tohle nechci, chci přidat
          program o zbohatnutí</span>
      </Button>
    </div>
  </div>
</template>
