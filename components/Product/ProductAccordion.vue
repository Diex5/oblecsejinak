<script setup lang=ts>
import Accordion from 'primevue/accordion'
import AccordionPanel from 'primevue/accordionpanel'
import AccordionHeader from 'primevue/accordionheader'
import AccordionContent from 'primevue/accordioncontent'

interface AccordionItem {
  value: string
  header: string
  content: string
}
defineProps<{

  items?: AccordionItem[]
}>()
</script>

<template>
  <div class="w-full flex  items-center justify-center">
    <Accordion class="w-full">
      <AccordionPanel
        v-for="item in items"
        :key="item.value"
        :value="item.value"
      >
        <AccordionHeader class="text-2xl font-medium">
          {{ item.header }}
        </AccordionHeader>
        <AccordionContent>
          <div class="[&>p]:font-600 my-4 flex flex-col gap-2 leading-relaxed text-lg text-surface-700" v-html="item.content" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
