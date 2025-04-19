<template>
  <section class="">
    <div class="flex flex-col items-center gap-6 mb-16">
      <h1 class="text-4xl md:text-5xl font-semibold text-surface-900 leading-tight text-center">
        RECENZE
      </h1>
      <p class="md:text-lg text-base text-surface-500 leading-normal max-w-2xl text-center">
        Magna eget est lorem ipsum dolor. Malesuada fames ac turpis egestas maecenas pharetra convallis. Leo vel fringilla est ullamcorper eget nulla facilisi.
      </p>
    </div>
    <div class="relative overflow-hidden">
      <!-- Gradienty pro vizuální náznak scrollu -->
      <div
        class="block absolute top-0 left-0 w-20 h-full z-10 pointer-events-none bg-gradient-to-r from-white via-white/50 to-transparent"
      />
      <div
        class="block absolute top-0 right-0 w-20 h-full z-10 pointer-events-none bg-gradient-to-l from-white via-white/50 to-transparent"
      />

      <!-- Scroll kontejner -->
      <div ref="scrollContainer" class="overflow-x-auto hide-scrollbar px-4 sm:px-[15.43rem]">
        <div class="flex flex-col gap-8">
          <!-- První řada -->
          <div class="flex gap-4 min-w-max">
            <div
              v-for="testimonial in firstRowDoubled"
              :key="testimonial.uniqueId"
              class="w-[80vw] sm:max-w-[26rem] shrink-0 p-4 sm:p-8 border border-surface-200 rounded-xl"
            >
              <div class="flex flex-col gap-4">
                <!-- SVG -->
                <svg class="md:w-12 md:h-12 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                  <path
                    d="M10.7287 27.1513C9.44125 25.7838 8.75 24.2501 8.75 21.7638C8.75 17.3888 11.8212 13.4676 16.2875 11.5288L17.4037 13.2513C13.235 15.5063 12.42 18.4326 12.095 20.2776C12.7662 19.9301 13.645 19.8088 14.5062 19.8888C16.7612 20.0976 18.5387 21.9488 18.5387 24.2501C18.5387 25.4104 18.0778 26.5232 17.2573 27.3437C16.4369 28.1641 15.3241 28.6251 14.1637 28.6251C12.8225 28.6251 11.54 28.0126 10.7287 27.1513ZM23.2287 27.1513C21.9412 25.7838 21.25 24.2501 21.25 21.7638C21.25 17.3888 24.3212 13.4676 28.7875 11.5288L29.9037 13.2513C25.735 15.5063 24.92 18.4326 24.595 20.2776C25.2662 19.9301 26.145 19.8088 27.0062 19.8888C29.2612 20.0976 31.0387 21.9488 31.0387 24.2501C31.0387 25.4104 30.5778 26.5232 29.7573 27.3437C28.9369 28.1641 27.8241 28.6251 26.6637 28.6251C25.3225 28.6251 24.04 28.0126 23.2287 27.1513Z"
                    class="fill-surface-500"
                  />
                </svg>
                <p class="md:text-lg text-base text-surface-500 leading-normal">
                  {{ testimonial.comment }}
                </p>
              </div>
              <div class="flex items-center gap-4 mt-8">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="md:w-16 md:h-16 w-8 h-8 rounded-full object-cover">
                <div>
                  <h3 class="md:text-lg text-base font-medium text-surface-900 leading-tight">
                    {{ testimonial.name }}
                  </h3>
                  <p class="text-base text-surface-500 leading-tight">
                    {{ testimonial.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Druhá řada -->
          <div class="flex gap-4 min-w-max sm:translate-x-[13rem]">
            <div
              v-for="testimonial in secondRowDoubled"
              :key="testimonial.uniqueId"
              class="w-[80vw] sm:max-w-[26rem] shrink-0 p-4 sm:p-8 border border-surface-200 rounded-xl"
            >
              <div class="flex flex-col gap-4">
                <svg class="md:w-12 md:h-12 w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                  <path
                    d="M10.7287 27.1513C9.44125 25.7838 8.75 24.2501 8.75 21.7638C8.75 17.3888 11.8212 13.4676 16.2875 11.5288L17.4037 13.2513C13.235 15.5063 12.42 18.4326 12.095 20.2776C12.7662 19.9301 13.645 19.8088 14.5062 19.8888C16.7612 20.0976 18.5387 21.9488 18.5387 24.2501C18.5387 25.4104 18.0778 26.5232 17.2573 27.3437C16.4369 28.1641 15.3241 28.6251 14.1637 28.6251C12.8225 28.6251 11.54 28.0126 10.7287 27.1513ZM23.2287 27.1513C21.9412 25.7838 21.25 24.2501 21.25 21.7638C21.25 17.3888 24.3212 13.4676 28.7875 11.5288L29.9037 13.2513C25.735 15.5063 24.92 18.4326 24.595 20.2776C25.2662 19.9301 26.145 19.8088 27.0062 19.8888C29.2612 20.0976 31.0387 21.9488 31.0387 24.2501C31.0387 25.4104 30.5778 26.5232 29.7573 27.3437C28.9369 28.1641 27.8241 28.6251 26.6637 28.6251C25.3225 28.6251 24.04 28.0126 23.2287 27.1513Z"
                    class="fill-surface-500"
                  />
                </svg>
                <p class="md:text-lg text-base text-surface-500 leading-normal">
                  {{ testimonial.comment }}
                </p>
              </div>
              <div class="flex items-center gap-4 mt-8">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="md:w-16 md:h-16 w-8 h-8 rounded-full object-cover">
                <div>
                  <h3 class="md:text-lg text-base font-medium text-surface-900 leading-tight">
                    {{ testimonial.name }}
                  </h3>
                  <p class="text-base text-surface-500 leading-tight">
                    {{ testimonial.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const firstRowTestimonials = [
  {
    id: 1,
    comment: 'Ipsum dolor sit amet consectetur. Orci a scelerisque purus semper eget. Odio eu feugiat pretium nibh ipsum consequat nisl vel. Eu nisl nunc mi ipsum faucibus.',
    name: 'Jane Cooper',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-18.png',
  },
  {
    id: 2,
    comment: 'Magna eget est lorem ipsum dolor. Malesuada fames ac turpis egestas maecenas pharetra convallis. Leo vel fringilla est ullamcorper eget nulla facilisi.',
    name: 'Olivia Holt',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-19.png',
  },
  {
    id: 3,
    comment: 'Sapien eget mi proin sed. Ultrices gravida dictum fusce ut placerat. Adipiscing tristique risus nec feugiat in fermentum. Nunc sed blandit libero volutpat.',
    name: 'Robert Fox',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-1.png',
  },
  {
    id: 4,
    comment: 'Nulla pharetra diam sit amet nisl suscipit adipiscing. Gravida quis blandit turpis cursus. Aliquet sagittis id consectetur purus ut faucibus.',
    name: 'Jacob Jones',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-15.png',
  },
]

const secondRowTestimonials = [
  {
    id: 5,
    comment: 'Ut faucibus pulvinar elementum integer enim. Faucibus purus in massa tempor nec. Aenean sed adipiscing diam donec adipiscing tristique.',
    name: 'Bessie Cooper',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-20.png',
  },
  {
    id: 6,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur purus ut faucibus pulvinar.',
    name: 'Eleanor Pena',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-21.png',
  },
  {
    id: 7,
    comment: 'Risus feugiat in ante metus dictum. Placerat in egestas erat imperdiet. Diam sit amet nisl suscipit adipiscing bibendum est ultricies.',
    name: 'Darrell Steward',
    title: 'Product Manager',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-17.png',
  },
  {
    id: 8,
    comment: 'Est sit amet facilisis magna etiam tempor orci eu. Amet cursus sit amet dictum. Sed adipiscing diam donec adipiscing. Est lorem ipsum dolor sit amet consectetur.',
    name: 'Wade Warren',
    title: 'Product Designer',
    avatar: 'https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-m-1.png',
  },
]

const firstRowDoubled = computed(() => [...firstRowTestimonials.map(t => ({ ...t, uniqueId: `first-${t.id}` })), ...firstRowTestimonials.map(t => ({ ...t, uniqueId: `first-duplicate-${t.id}` }))])

const secondRowDoubled = computed(() => [...secondRowTestimonials.map(t => ({ ...t, uniqueId: `second-${t.id}` })), ...secondRowTestimonials.map(t => ({ ...t, uniqueId: `second-duplicate-${t.id}` }))])

const scrollContainer = ref(null)

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = (scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth) / 2
  }
})
</script>

<style scoped>
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
