<script setup>
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="w-full flex items-center justify-center">
    <Accordion class="w-full">
      <AccordionPanel
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        <AccordionHeader class="text-lg font-medium">
          {{ item.header }}
        </AccordionHeader>
        <AccordionContent>
          <div class="leading-relaxed text-base text-surface-700">
            {{ item.content }}
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
