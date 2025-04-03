<script setup>
// Mock data pro produkt
const product = ref({
  id: 'tirko-premium-cotton',
  name: 'TIRKO – Prémiové bavlněné tričko',
  price: 499,
  originalPrice: 699,
  description: 'Prémiové bavlněné tričko TIRKO kombinuje minimalistický design s maximálním pohodlím. Ideální volba pro každodenní nošení díky kvalitnímu materiálu a preciznímu střihu.',
  rating: 4.8,
  reviews: 743,
  viewers: 8,
  stock: 'medium', // 'low', 'medium', 'high'
  features: [
    '100% organická bavlna pro dokonalý komfort',
    'Univerzální střih, který padne každé postavě',
    'Odolný materiál, který si zachová tvar i po mnoha praních',
    'Prodyšná tkanina zajišťující svěžest po celý den',
  ],
  colors: [
    { id: 'black', name: 'Černá', hex: '#000000', active: true },
    { id: 'white', name: 'Bílá', hex: '#FFFFFF', active: false },
    { id: 'gray', name: 'Šedá', hex: '#9CA3AF', active: false },
  ],
  sizes: [
    { id: 'S', label: 'S', active: false },
    { id: 'M', label: 'M', active: true },
    { id: 'L', label: 'L', active: false },
    { id: 'XL', label: 'XL', active: false },
    { id: 'XXL', label: 'XXL', active: false },
  ],
  images: [
    { src: 'https://merchize.com/wp-content/uploads/2021/07/AOP-T-shirt-3-copy.jpg', alt: 'TIRKO – hlavní pohled' },
    { src: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/f2646b7f-5bf7-48b0-80b5-178d4ac0ec5d/segments/4:4:1/Flux_Schnell_a_plain_white_background_with_a_modern_amateursty_3.jpeg', alt: 'TIRKO – detail materiálu' },
    { src: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/a7efc090-77f7-4f0d-930a-09f6e77d1088/AlbedoBase_XL_A_modern_and_playful_logo_for_an_online_store_sp_2.jpg', alt: 'TIRKO – detail materiálu' },
    { src: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/fd47530a-4ce4-4ef5-9e97-b9902efa9c58/Leonardo_Phoenix_09_A_creative_and_playful_logo_for_an_online_2.jpg', alt: 'TIRKO – detail materiálu' },
    { src: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/f2646b7f-5bf7-48b0-80b5-178d4ac0ec5d/segments/2:4:1/Flux_Schnell_a_plain_white_background_with_a_modern_amateursty_1.jpeg', alt: 'TIRKO – pohodlný střih' },
  ],
  tabs: [
    {
      id: '0',
      label: 'Podrobnosti',
      content: ' <h1>🔥 JEDINÉ TRIČKO, KTERÉ POTŘEBUJEŠ! 🔥</h1> <p>Už tě nebaví nekvalitní hadry, které se po pár praních roztáhnou, vyblednou a ztratí tvar? Už nemusíš hledat dál, protože TIRKO je tady! 👕✨</p> <p>Toto tričko není jen obyčejným kusem oblečení – je to revoluce v pohodlí, stylu a kvalitě. Vyrobené z <strong>prvotřídní bavlny</strong>, která dýchá, je příjemná na dotek a perfektně drží tvar i po několika praních. To znamená, že nebudeš muset znovu a znovu řešit, jak ti tričko po několika týdnech užívání ztratilo svůj vzhled. S TIRKEM budeš mít jistotu, že každý den budeš vypadat skvěle a cítit se skvěle!</p> <h2>Proč je TIRKO jiné než všechno, co znáš?</h2> <ul> <li><strong>Neuvěřitelný komfort</strong> – Bavlna, která dýchá, tě nebude nikdy tlačit ani dráždit. Už žádné nepohodlné triko, které si po pár hodinách chceš sundat.</li> <li><strong>Perfektní střih</strong> – TIRKO je navrženo tak, aby ti dokonale sedlo. Ať už jdeš na schůzku, do města, nebo na víkendový výlet, budeš v něm vypadat a cítit se skvěle.</li> <li><strong>Odolnost</strong> – Zapomeň na vybledlé barvy nebo roztahané švy. TIRKO zůstane jako nové i po několika praních.</li> <li><strong>Stylový design</strong> – Kombinace klasického střihu a moderního vzhledu, který se hodí k jakémukoli outfitu.</p>',
    },
    {
      id: '1',
      label: 'Materiály',
      content: 'Tričko je vyrobeno z jemné, prodyšné bavlny, která je šetrná k pokožce. Materiál prošel speciálním zpracováním, aby minimalizoval žmolkování a zajišťoval dlouhou životnost. Švy jsou zesílené pro větší odolnost a pohodlí při nošení.',
    },
    {
      id: '2',
      label: 'Údržba',
      content: 'Pro zachování kvality doporučujeme prát naruby na 30 °C s podobnými barvami. Nepoužívejte bělidla ani agresivní prací prostředky. Sušte volně na vzduchu a žehlete na nízkou teplotu. Pro maximální ochranu materiálu nepoužívejte sušičku.Pro zachování kvality doporučujeme prát naruby na 30 °C s podobnými barvami. Nepoužívejte bělidla ani agresivní prací prostředky. Sušte volně na vzduchu a žehlete na nízkou teplotu. Pro maximální ochranu materiálu Pro zachování kvality doporučujeme prát naruby na 30 °C s podobnými barvami. Nepoužívejte bělidla ani agresivní prací prostředky. Sušte volně na vzduchu a žehlete na nízkou teplotu. Pro maximální ochranu materiáluPro zachování kvality doporučujeme prát naruby na 30 °C s podobnými barvami. Nepoužívejte bělidla ani agresivní prací prostředky. Sušte volně na vzduchu a žehlete na nízkou teplotu. Pro maximální ochranu materiáluPro zachování kvality doporučujeme prát naruby na 30 °C s podobnými barvami. Nepoužívejte bělidla ani agresivní prací prostředky. Sušte volně na vzduchu a žehlete na nízkou teplotu. Pro maximální ochranu materiálu',
    },
  ],
  benefits: [
    { icon: 'pi pi-check', text: '100% organická bavlna' },
    { icon: 'pi pi-wind', text: 'Prodyšný a příjemný materiál' },
    { icon: 'pi pi-shirt', text: 'Univerzální střih' },
  ],
  accordion: [
    {
      value: '0',
      header: 'O produktu',
      content: 'Prémiové bavlněné tričko TIRKO je navrženo s důrazem na kvalitu a pohodlí. Díky použití 100% organické bavlny je mimořádně příjemné na nošení a zároveň šetrné k životnímu prostředí. Je ideální jak na volný čas, tak i jako základ každodenního outfitu.',
    },
    {
      value: '1',
      header: 'Doprava a platba',
      content: 'Doprava je zdarma pro objednávky nad 1000 Kč. Standardní doručení probíhá do 2-3 pracovních dnů. Nabízíme platbu kartou, bankovním převodem nebo na dobírku. Možnost expresního doručení do druhého dne za příplatek 99 Kč.',
    },
    {
      value: '2',
      header: 'Udržitelnost',
      content: 'Tričko TIRKO je vyrobeno z organické bavlny s certifikací GOTS, což znamená, že splňuje přísné ekologické a etické standardy. Výroba probíhá v podmínkách, které minimalizují spotřebu vody a eliminují škodlivé chemikálie. Balení je plně recyklovatelné.',
    },
  ],
  recommendation: {
    name: 'PDF - Jak správně pečovat o bavlněné oblečení',
    originalPrice: 199,
    price: 0,
    image: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/ecommerce/productoverview/product-suggestion.png',
  },
  videoThumbnail: 'https://cdn.leonardo.ai/users/522075df-9aa6-4010-a4cc-9c8e1578895b/generations/a7efc090-77f7-4f0d-930a-09f6e77d1088/AlbedoBase_XL_A_modern_and_playful_logo_for_an_online_store_sp_1.jpg',
})

// Breadcrumb
const home = ref({
  label: 'Domů',
  icon: 'pi pi-home',
  route: '/',
})

const items = ref([
  { label: 'Pánské', route: '/panske' },
  { label: 'Obuv', route: '/panske/obuv' },
  { label: product.value.name },
])

// Interaktivní stavy
const count = ref(1)
const selectedColor = ref(product.value.colors.find(c => c.active).id)
const selectedSize = ref(product.value.sizes.find(s => s.active).id)

// Pomocné funkce
const decrementCount = () => {
  if (count.value > 1) {
    count.value -= 1
  }
}

const incrementCount = () => {
  count.value += 1
}

const updateColor = colorId => {
  selectedColor.value = colorId
}

const updateSize = sizeId => {
  selectedSize.value = sizeId
}

// Formátování ceny
const formatPrice = price => {
  return new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(price)
}

const addToCart = () => {
  // Tady by byla implementace přidání do košíku
  alert(`Přidáno do košíku: ${product.value.name}, barva: ${currentColor.value.name}, velikost: ${currentSize.value.label}, počet: ${count.value}`)
}
</script>

<template>
  <div>
    <div class="container px-6 py-14 md:px-12 lg:px-20 mx-auto">
      <!-- Breadcrumb -->
      <div class="py-4 mb-8">
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
      <ProductGallery :images="product.images" />

      <div class="mt-16 flex items-start gap-1rem md:gap-2rem lg:flex-row flex-col">
        <!-- Informace o produktu -->
        <ProductInfo
          :name="product.name"
          :description="product.description"
          :features="product.features"
          :tabs="product.tabs"
          :benefits="product.benefits"
        />

        <!-- Sidebar s nákupními informacemi -->
        <ProductSidebar
          :price="product.price"
          :original-price="product.originalPrice"
          :rating="product.rating"
          :reviews="product.reviews"
          :viewers="product.viewers"
          :colors="product.colors"
          :sizes="product.sizes"
          :stock="product.stock"
          :count="count"
          :selected-color="selectedColor"
          :selected-size="selectedSize"
          :benefits="product.benefits"
          :recommendation="product.recommendation"
          :video-thumbnail="product.videoThumbnail"
          :format-price="formatPrice"
          @increment-count="incrementCount"
          @decrement-count="decrementCount"
          @update-color="updateColor"
          @update-size="updateSize"
        />
      </div>

      <!-- Accordion -->
    </div>
    <div class="mt-16">
      <TestimonialSlideGradient />
    </div>
    <div container class="mt-16">
      <ProductAccordion :items="product.accordion" />
    </div>
    <!--  <div fixed bottom-0 mx-auto container flex justify-center items-center left-0 w-full z-10>
      <Button icon="pi pi-arrow-down" mx-auto text-1rem bg-primary-500 text-white font-600 md:w="50%" w-full>
        Vybrat barvu a velikost
      </Button>
    </div> -->
  </div>
</template>
