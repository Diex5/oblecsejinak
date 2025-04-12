<script setup lang="ts">
import { useIntersectionObserver, useWindowSize } from '@vueuse/core'

const { fetchProduct } = useProduct()
const slug = useRoute().params.slug as string

const { product, availableColorsForSelectedSize, availableSizesForSelectedColor } = storeToRefs(useProduct())
onMounted(async () => {
  await fetchProduct(slug)
})

// Breadcrumb
const home = ref({
  label: 'Domů',
  icon: 'pi pi-home',
  route: '/',
})

const items = computed(() => [
  { label: 'Produkty', route: '/produkty' },
  { label: product.value.name || 'Produkt' },
])

// Zbytek vaší původní logiky pro sticky bar a animace
const mainSection = ref(null)
const isVisible = ref(true)
const currentVisibility = ref(1)
const { width } = useWindowSize()

useIntersectionObserver(
  mainSection,
  ([entry]) => {
    currentVisibility.value = entry.intersectionRatio
    const threshold = width.value <= 768 ? 0.1 : 0.2
    isVisible.value = entry.intersectionRatio > threshold
  },
  {
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: '0px 0px 100px 0px',
  },
)

const showBar = computed(() => {
  if (width.value === undefined) return false
  return !isVisible.value
})

const initial = ref({
  y: 100,
  opacity: 0,
})

const enter = ref({
  y: 0,
  opacity: 1,
})
</script>

<template>
  <div>
    <div v-if="product">
      <div class="container px-6 mx-auto">
        <!-- Breadcrumb -->
        <div v-motion-fade-visible-once class="py-4 mb-8 ">
          <Breadcrumb :home="home" :model="items">
            <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span class="font-medium text-primary hover:underline px-4 whitespace-nowrap text-base">{{ item.label }}</span>
                </a>
              </router-link>
              <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                <span class="text-surface-700 px-4 whitespace-nowrap text-base">{{ item.label }}</span>
              </a>
            </template>
            <template #separator>
              <i class="pi pi-chevron-right !text-xl !leading-none text-surface-400" />
            </template>
          </Breadcrumb>
        </div>

        <!-- Galerie produktu -->
        <!--  <ProductGallery
        v-motion
        :initial="initial"
        :enter="enter" :product="rawProduct"
      /> -->

        <div ref="mainSection" class="v-motion-fade-visible mt-16 flex items-start gap-1rem md:gap-6rem lg:flex-row flex-col">
          <!-- Informace o produktu -->
          <ProductInfo
            :product="product"
          />

          <!-- Sidebar s nákupními informacemi -->
          <ProductSidebar
            :product="product"
            :colors="availableColorsForSelectedSize"
            :sizes="availableSizesForSelectedColor"
          />
        </div>

      <!-- Accordion -->
      </div>

      <ProductStickyBar
        :product="product"
        :show-bar="showBar"
        :colors="availableColorsForSelectedSize"
        :sizes="availableSizesForSelectedColor"
      />
      <div class="mt-16">
        <TestimonialSlideGradient />
      </div>
    <!--  <div container class="mt-16">
      <ProductAccordion :items="product.accordion" />
    </div> -->
    </div>
    <div v-else>
      Neni zadnej produkt
    </div>
  </div>
</template>
