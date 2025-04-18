import { useStorage, useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { StripeIntentResponse } from '~/types/stripe'

export const useStripeStore = defineStore('stripe', () => {
  const customerId = useStorage('customerId', '')
  const status = useSessionStorage('status', '')
  const paymentMethodId = useStorage('paymentMethodId', '')
  const toast = useToast()

  const isLoading = ref(false)

  const { stripe, loadStripe } = useClientStripe()
  const errors = ref<string[]>([])
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

  async function loadStripeElements (userData: { name: string, email: string }, amount: number) {
    if (stripe.value) {
      // Vytvořte čistý objekt bez reaktivity
      const requestBody = {
        amount: amount,
        userData: { name: userData.name, email: userData.email },
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

      customerId.value = response.customerId

      elements.value = stripe.value.elements({
        clientSecret: response.clientSecret as string,
        locale: 'cs',
      })

      const paymentElement = elements.value.create('payment')
      paymentElement.mount('#payment-element')
    }
  }
  const handleSubmit = async () => {
    if (isLoading.value) return false
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

        errors.value.push(errorMessage as string)
        toast.add({
          severity: 'error',
          summary: 'Chyba',
          detail: 'Platba nebyla úspěšná, kontaktujte nás',
          life: 3000,
        })
        return false
      }
      console.log('PaymentIntent:', paymentIntent)
      if (paymentIntent) {
        paymentMethodId.value = paymentIntent.payment_method || ''
        status.value = 'success'

        toast.add({
          severity: 'success',
          summary: 'Platba byla úspěšná',
          /*  detail: 'Děkujeme! Položka je přidána k objednávce', */
          life: 3000,
        })
        return true
        /*  navigateTo('/success') */
      }
      return false
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

  return { customerId, paymentMethodId, errors, setPaymentInfo, loadStripeElements, stripe, loadStripe, handleSubmit }
})
