<script setup lang="ts">
import { useSessionStorage } from '@vueuse/core'

onMounted(() => {
  useSessionStorage('status', 'completed')
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 flex items-center">
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Horní barevný pruh -->
      <div class="bg-gradient-to-r from-green-500 to-blue-600 py-3 px-6">
        <h1 class="text-3xl md:text-4xl font-bold text-white text-center">
          Děkujeme za vaši objednávku! 🎉
        </h1>
      </div>

      <!-- Hlavní obsah -->
      <div class="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Levá strana - hlavní info -->
        <div class="flex flex-col justify-center">
          <div class="mb-6 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h2 class="text-xl font-bold text-gray-800 mb-2">
              ✅ Objednávka úspěšně dokončena
            </h2>
            <p class="text-gray-600">
              Právě jsme vám poslali potvrzení na e-mail. Zkontrolujte si prosím svou schránku.
            </p>
          </div>

          <div class="space-y-4">
            <p class="text-lg text-gray-700">
              <span class="font-bold">Co bude dál?</span><br>
              Všechny podrobnosti najdete v e-mailu, který jsme vám právě odeslali.
            </p>

            <div class="p-4 bg-blue-50 rounded-lg">
              <h3 class="font-bold text-blue-800 mb-2">
                📬 Kam dál?
              </h3>
              <ul class="list-disc pl-5 space-y-1 text-gray-700">
                <li>Zkontrolujte si e-mail včetně spamu</li>
                <li>Sledujte náš Instagram pro novinky</li>
                <li>Přidejte si nás do kontaktů, aby e-mail nepřehlédnete</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Pravá strana - ilustrace a odkazy -->
        <div class="flex flex-col items-center justify-center space-y-6">
          <img
            src="https://cdn.pixabay.com/photo/2017/01/09/12/49/mail-1965791_1280.png"
            alt="E-mail potvrzení"
            class="w-64 h-auto"
          >

          <div class="text-center">
            <p class="text-gray-600 mb-4">
              Sledujte nás na sociálních sítích pro exkluzivní obsah:
            </p>
            <div class="flex justify-center space-x-4">
              <a href="#" class="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748 1.857.344.353.3.882.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 16.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Spodní část s tlačítkem -->
      <div class="bg-gray-50 px-8 py-6 text-center">
        <nuxt-link
          to="/"
          class="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
        >
          ← Návrat na hlavní stránku
        </nuxt-link>
        <p class="mt-4 text-sm text-gray-500">
          Potřebujete pomoc? <a href="mailto:podpora@vasefirma.cz" class="text-blue-600 hover:underline">podpora@vasefirma.cz</a>
        </p>
      </div>
    </div>
  </div>
</template>
