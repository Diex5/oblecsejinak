<script setup lang=ts>
import type { ProductWithVariants } from '~/server/database/schema'

const props = defineProps<{
  product: ProductWithVariants
}>()
</script>

<template>
  <div class="flex-1 max-w-100%">
    <!-- Název produktu -->
    <h1 v-motion-fade-visible-once class="text-4xl dark:text-red-500 lg:text-6xl font-semibold text-surface-900 font-oswald tracking-wide">
      {{ product.name }}
    </h1>

    <!-- Popis produktu -->
    <p v-motion-fade-visible-once class="mt-6 md:md:text-xl text-base  font-medium text-surface-600 leading-relaxed ">
      {{ product.description }}
    </p>

    <!-- Seznam vlastností -->

    <ProductBenefit :benefits="product.benefits" />

    <!-- Záložky s informacemi -->
    <div class="mt-6 md:text-xl text-base">
      <Tabs v-motion-fade-visible-once scrollable value="0" bg-transparent>
        <TabList class="bg-transparent border-b border-surface-200 font-600 font-oswald ">
          <Tab
            v-for="(tab, index) in product.tabs"
            :key="tab.id"
            :value="String(index)"
            class="font-medium md:text-2xl text-lg"
          >
            {{ tab.title }}
          </Tab>
        </TabList>
        <TabPanels class="!px-0 py-0! bg-transparent  md:pt-6">
          <TabPanel
            v-for="(tab, index) in product.tabs"
            :key="tab.id"
            :value="String(index)"
          >
            <span class="[&>p]:font-600 [&>h3]:text-primary-700 [&>table]:my-4 [&>table>tbody>tr>td]:border-1! [&>ul]:list-disc [&>ul]:list-inside [&>ul]:my-4 [&>ul]:ml-4 my-4 flex flex-col text-left" v-html="tab.content" />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div class="md:mt-8 mb-6 md:text-xl text-base">
        <ul class="md:ml-5 list-none flex flex-col gap-4 font-sans font-600 ">
          <li
            v-for="(feature, index) in product.features"
            :key="index"
            v-motion-fade-visible-once
            class="text-surface-700 leading-relaxed"
          >
            <div>
              <UnoIcon
                class="text-primary mr-3 md:text-xl text-base" :class="feature.icon"
              />
              <span class="text-surface-700 leading-relaxed">
                {{ feature.content }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
