import { useSessionStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware((to, from) => {
  // Pouze na klientské straně
  if (import.meta.client) {
    // Hodnota status bude načtena z sessionStorage
    const status = useSessionStorage('status') // Výchozí hodnota, pokud není nastavena ve sessionStorage

    // Zkontroluj hodnotu status
    if (status.value !== 'success') {
      if (to.path === '/success') {
        return navigateTo('/checkout')
      }
      else {
        return navigateTo(from.fullPath)
      }
    }
  }
})
