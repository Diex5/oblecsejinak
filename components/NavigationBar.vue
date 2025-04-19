<script lang="ts" setup>
const { toggleCart } = useCart()
const { totalItems } = storeToRefs(useCart())

const items = ref([
  {
    label: 'E-Shop',
    root: true,
    items: [
      [
        {
          items: [
            { label: 'Produkty', icon: 'pi pi-list', subtext: 'Procházet naše produkty' },
            { label: 'Kategorie', icon: 'pi pi-tags', subtext: 'Prozkoumat podle kategorií' },
            { label: 'Novinky', icon: 'pi pi-star', subtext: 'Podívejte se na nejnovější' },
          ],
        },
      ],
      [
        {
          items: [
            { label: 'Navrhněte si vlastní', icon: 'pi pi-pencil', subtext: 'Vytvořte si vlastní návrhy' },
            { label: 'Nejprodávanější', icon: 'pi pi-chart-line', subtext: 'Naše nejoblíbenější položky' },
            { label: 'Slevy', icon: 'pi pi-dollar', subtext: 'Aktuální slevy a nabídky' },
          ],
        },
      ],
      [
        {
          items: [
            { label: 'Recenze zákazníků', icon: 'pi pi-comments', subtext: 'Podívejte se, co říkají ostatní' },
            { label: 'Často kladené otázky', icon: 'pi pi-question', subtext: 'Často kladené otázky' },
            { label: 'Podpora', icon: 'pi pi-info-circle', subtext: 'Získejte pomoc a podporu' },
          ],
        },
      ],
      [
        {
          items: [
            { image: 'https://example.com/path/to/your/image.png', label: 'ZAČNĚTE', subtext: 'Začněte nakupovat nyní!' },
          ],
        },
      ],
    ],
  },
  {
    label: 'O nás',
    root: true,
  },
  {
    label: 'Kontakt',
    root: true,
  },
])
</script>

<template>
  <nav w-full bg-surface-0>
    <div container py-1rem flex justify-between w-full items-center>
      <MegaMenu :model="items" class=" bg-surface-0 border-none!" w-full>
        <template #start>
          <NuxtImg src="https://placehold.co/50x50" w-10 h-10 rounded-full />
        </template>
        <template #item="{ item }">
          <a
            v-if="item.root"
            class="flex items-center cursor-pointer px-4 py-2 overflow-hidden relative font-semibold text-lg "
          >
            <span>{{ item.label }}</span>
          </a>
          <a v-else-if="!item.image" class="flex items-center md:p-4 cursor-pointer mb-2 gap-3">
            <span
              class="inline-flex items-center justify-center rounded-full bg-primary text-primary-contrast w-12 h-12"
            >
              <i :class="[item.icon, 'text-lg']" />
            </span>
            <span class="inline-flex flex-col gap-1">
              <span class="font-bold text-lg">{{ item.label }}</span>
              <span class="whitespace-nowrap">{{ item.subtext }}</span>
            </span>
          </a>
          <div v-else class="flex flex-col items-start gap-4 p-2">
            <img alt="megamenu-demo" :src="item.image" class="w-full">
            <span>{{ item.subtext }}</span>
            <Button :label="item.label" outlined />
          </div>
        </template>
        <template #end>
          <div flex items-center gap-0.5rem>
            <Avatar image="https://placehold.co/50x50" shape="circle" />

            <OverlayBadge :value="totalItems ?? ''" severity="info">
              <Button
                icon="pi pi-shopping-cart" class="py-1!" severity="secondary" relative size="large" variant="text"
                @click="toggleCart"
              />
            </OverlayBadge>
          </div>
        </template>
      </MegaMenu>
    </div>
  </nav>
</template>

<style>
.pi-shopping-cart {
  font-size: 1.6rem !important
}
</style>
