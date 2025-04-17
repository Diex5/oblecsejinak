import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { StripeIntentResponse } from '~/types/stripe'

export const useStripeStore = defineStore('stripe', () => {
  const customerId = useStorage('customerId', '')
  const paymentMethodId = useStorage('paymentMethodId', '')
  const toast = useToast()

  const isLoading = ref(false)

  const { stripe, loadStripe } = useClientStripe()
  const errors = ref<string[]>([])
  const paymentElement = ref<HTMLElement | null>(null)
  const elements = ref<any>(null)

  useAsyncData(async () => {
    if (import.meta.env.SSR) return

    // Tato část je nyní volitelná, protože useStorage načítá hodnoty automaticky
    // Ponecháno pro zachování struktury původního kódu
  })

  function setPaymentInfo (cId: string, pId: string) {
    customerId.value = cId
    paymentMethodId.value = pId

    // Není třeba explicitně ukládat do localStorage, useStorage se o to stará automaticky
    if (import.meta.env.SSR) return
  }
  const userData = {
    name: 'Jan Novak',
    email: 'jan@wnekde.cz',
    uuid: '123-abc',
  }

  async function loadStripeElements () {
    if (stripe.value) {
      // Vytvořte čistý objekt bez reaktivity
      const requestBody = {
        amount: 31,
        userData,
        currency: 'czk',
      }

      const response = await $fetch<StripeIntentResponse>('/api/stripe/create-payment-intent', {
        method: 'POST',
        body: requestBody,
      })

      if (response.error) {
        console.error(response.error)
        return
      }

      if (customerId.value) { // použijte .value pro přístup k hodnotě
        customerId.value = ''
        console.log('Customer ID:', customerId.value)
      }

      elements.value = stripe.value.elements({
        clientSecret: response.clientSecret as string,
        locale: 'cs',
      })

      const paymentElement = elements.value.create('payment')
      paymentElement.mount('#payment-element')
    }
  }
  const handleSubmit = async () => {
    if (isLoading.value) return
    isLoading.value = true

    try {
      const { error, paymentIntent } = await stripe.value.confirmPayment({
        elements: elements.value, // Ujistěte se, že používáte elements.value
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      })

      if (error) {
        const errorMessage = error.type === 'card_error' || error.type === 'validation_error'
          ? error.message
          : 'An unexpected error occurred.'

        errors.value.push(errorMessage)
        toast.add({
          severity: 'error',
          summary: 'Chyba',
          detail: 'Platba nebyla úspěšná, kontaktujte nás',
          life: 3000,
        })
        return
      }

      if (paymentIntent) {
        // Uložení do store (useStorage se postará o localStorage automaticky)
        customerId.value = paymentIntent.customer || ''
        paymentMethodId.value = paymentIntent.payment_method || ''

        toast.add({
          severity: 'success',
          summary: 'Platba byla úspěšná',
          detail: 'Děkujeme! Položka je přidána k objednávce',
          life: 3000,
        })

        navigateTo('/success')
      }
    }
    catch (e) {
      console.error('Payment error:', e)
      errors.value.push('Došlo k neočekávané chybě')
      toast.add({
        severity: 'error',
        summary: 'Chyba',
        detail: 'Nastala systémová chyba při platbě',
        life: 3000,
      })
    }
    finally {
      isLoading.value = false
    }
  }

  return { customerId, paymentMethodId, setPaymentInfo, loadStripeElements, stripe, loadStripe }
})
