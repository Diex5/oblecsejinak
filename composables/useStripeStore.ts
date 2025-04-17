import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useStripeStore = defineStore('stripe', () => {
  const customerId = useStorage('customerId', '')
  const paymentMethodId = useStorage('paymentMethodId', '')
  const isLoading = ref(false)
  const { stripe } = useClientStripe()
  const errors = ref([])
  let elements = ref<any>(null)

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

  const loadStripeElements = async () => {
    if (stripe.value) {
      const { clientSecret, error, customerId } = await $fetch('/api/create-payment-intent')
      if (error) {
        console.error(error)
        errors.value.push(error)
        return
      }
      if (customerId) {
        setPaymentInfo(customerId, '')
      }
      elements = stripe.value.elements({
        clientSecret: clientSecret as string,
        locale: 'cs',
      })

      const paymentElement = elements.create('payment')
      paymentElement.mount('#payment-element')

      const linkAuthenticationElement = elements.create('linkAuthentication')
      linkAuthenticationElement.mount('#linkAuthenticationElement')
    }
  }

  /*  const handleSubmit = async (amount: number) => {
    if (isLoading.value) return
    isLoading.value = true

    const { error, paymentIntent } = await stripe.value.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        errors.value.push(error.message)
      }
      else {
        errors.value.push('An unexpected error occurred.')
      }
      isLoading.value = false
      return
    }

    if (paymentIntent) {
      localStorage.setItem('customerId', paymentIntent.customer)
      localStorage.setItem('paymentMethodId', paymentIntent.payment_method)
      localStorage.setItem('status', 'success')
      setPaymentInfo(customerId, paymentIntent.payment_method)
      console.log('customerId', customerId)
      console.log('payment_method', paymentIntent.payment_method)
      navigateTo('/success')
    }
    isLoading.value = false
  } */

  return { customerId, paymentMethodId, setPaymentInfo, loadStripeElements }
})
