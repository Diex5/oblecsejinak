<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  tabs: {
    type: Array,
    required: true,
  },
  benefits: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="flex-1">
    <!-- Název produktu -->
    <h1 class="text-4xl dark:text-red-500 lg:text-6xl font-semibold text-surface-900 font-oswald tracking-wide">
      {{ name }}
    </h1>

    <!-- Popis produktu -->
    <p class="mt-6 text-xl font-medium text-surface-800 leading-relaxed">
      {{ description }}
    </p>

    <!-- Seznam vlastností -->
    <div class="md:mt-8 mt-6 text-xl">
      <ul class="ml-5 list-disc flex flex-col gap-4 font-sans font-600 ">
        <li
          v-for="(feature, index) in features"
          :key="index"
          class="text-surface-700 leading-relaxed"
        >
          {{ feature }}
        </li>
      </ul>
    </div>

    <!-- Záložky s informacemi -->
    <div class="mt-12 text-xl">
      <Tabs value="0" bg-transparent>
        <TabList class="bg-transparent border-b border-surface-200 font-600 font-oswald ">
          <Tab
            v-for="tab in tabs"
            :key="tab.id"
            :value="tab.id"
            class="px-6 py-3 font-medium text-xl"
          >
            {{ tab.label }}
          </Tab>
        </TabList>
        <TabPanels class="!px-0 bg-transparent pt-6">
          <TabPanel
            v-for="tab in tabs"
            :key="tab.id"
            :value="tab.id"
          >
            <p class="m-0 text-xl  leading-relaxed text-surface-700" v-html="tab.content" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
    <!--  <ul class="list-none w-full  md:block hidden flex flex-col items-center justify-center text-lg p-0 m-0 font-medium text-surface-600 bg-surface-50 rounded-lg py-6 shadow-sm">
      <li
        v-for="(benefit, index) in benefits"
        :key="index"
        pl-1rem
        class="flex items-center mb-4 last:mb-0"
      >
        <i :class="benefit.icon" class="mr-3 text-primary" />
        <span>{{ benefit.text }}</span>
      </li>
    </ul> -->
  </div>
</template>
