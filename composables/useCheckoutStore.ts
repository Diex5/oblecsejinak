import { defineStore } from 'pinia'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

interface UpsellItem {
  id: string
  price: number
  title: string
  isSelected: boolean
}
type StockCheckResponse = {
  success: boolean
  message?: string
  stockCheck?: {
    product_id: string
    variant_id: string
    message: string
  }[]
}
export const useCheckoutStore = defineStore('checkout', () => {
  const currentStep = ref(1)
  const toast = useToast()
  const { totalPrice, cartItems, discount } = storeToRefs(useCart())

  const emailValidation = yup
    .string()
    .matches(/[\w.-]+@[\w.-]+\.\w{2,}/, 'Neplatný formát e-mailu')
    .required('E-mail je povinný')

  const phoneValidation = yup
    .string()
    .matches(/^(\+420|\+421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/, {
      message: 'Neplatný formát telefonu',
      excludeEmptyString: true,
    })
    .required('Telefon je povinný')

  const schema = yup.object({
    firstName: yup.string().required('Jméno je povinné'),
    lastName: yup.string().required('Příjmení je povinné'),
    email: emailValidation,
    phone: phoneValidation,
    street: yup.string().required('Ulice je povinná'),
    city: yup.string().required('Město je povinné'),
    zip: yup.string().matches(/^\d{3} ?\d{2}$/, 'PSČ není platné').required('PSČ je povinné'),
    country: yup.object({
      name: yup.string().required('Zvolte stát'),
      code: yup.string().required(),
    })
      .required('Země je povinná'),
    shippingMethod: yup
      .object({
        id: yup.number().required('ID je povinné'), // Kontrola, že je ID
        title: yup.string().required('Název je povinný'), // Kontrola, že je title
        turnaround: yup.string().required('Doba doručení je povinná'), // Kontrola, že je turnaround
        price: yup.string().required('Cena je povinná'), // Kontrola, že je cena
      })
      .required('Zvolte způsob dopravy'),
  })

  const {
    handleSubmit,
    values,
    errors,
    resetForm,
    meta,
    isSubmitting,
    setFieldValue,
    validateField,
  } = useForm({
    validationSchema: schema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      zip: '',
      country: '',
      shippingMethod: {
        id: 0,
        title: '',
        turnaround: '',
        price: '0',
      },
    },
  })

  const validateStep = async () => {
    if (currentStep.value === 1) {
      const fields = ['firstName', 'lastName', 'email', 'phone', 'street', 'city', 'zip', 'country', 'shippingMethod']
      const results = await Promise.all(fields.map(field => validateField(field as keyof typeof values)))
      const isValid = results.every(r => r.valid)
      if (isValid) return true
      return false
    }
  }

  const goToPreviousStep = () => {
    if (currentStep.value > 1) currentStep.value--
  }

  const selectedUpsells = ref<UpsellItem[]>([])

  function toggleUpsell (id: string, price: number, title: string) {
    const existingUpsell = selectedUpsells.value.find(item => item.id === id)

    if (existingUpsell) {
      existingUpsell.isSelected = !existingUpsell.isSelected
    }
    else {
      selectedUpsells.value.push({
        id,
        price,
        title,
        isSelected: true,
      })
    }
  }
  const onlyActiveUpsells = computed<UpsellItem[]>(() => {
    return selectedUpsells.value.filter(item => item.isSelected)
  })

  const totalOrderPrice = computed(() => {
    const upsellTotal = onlyActiveUpsells.value.reduce((sum, u) => sum + u.price, 0)
    const shippingPrice = parseFloat(values.shippingMethod?.price || '0')

    return Math.ceil(totalPrice.value + shippingPrice + upsellTotal).toFixed(1)
  })

  async function handleSubmitForm () {
    try {
      const { success, order_id } = await $fetch('/api/orders/create', {
        method: 'POST',
        body: JSON.stringify({
          user_id: 123,
          shipping_address: {
            name: `${values.firstName} ${values.lastName}`,
            street: values.street,
            city: values.city,
            postal_code: values.zip,
            country: values.country,
            phone: values.phone,
          },

          shipping_method: values.shippingMethod.title,
          shipping_price: values.shippingMethod.price,
          total_price: totalOrderPrice.value,
          subtotal: Math.ceil(totalPrice.value).toFixed(1),
          discount: discountedPrice,
          discount_code: discount.value.code,
          payment_method: 'card',
          note: 'Prosím doručit ve večerních hodinách.',
          items: cartItems.value.map((item: CartItem) => ({
            product_id: item.productId,
            variant_id: item.variantId,
            quantity: item.quantity,
            price: item.price,
            name: item.name,
            color_name: item.color?.name,
            size_name: item.size?.name,
          })),
        }),
      })
      return { success, order_id }

      /*   upsells: onlyActiveUpsells.value.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
          })), */
    }
    catch (error: any) {
      console.error('Error creating order:', error)

      return { success: false }
    }
  }

  async function checkStock (items: CartItem[]) {
    const response = await $fetch<StockCheckResponse>('/api/products/check-stock', {
      method: 'POST',
      body: {
        items: items.map((item: CartItem) => ({
          product_id: item.productId,
          variant_id: item.variantId,
          quantity: item.quantity,
        })),
      },
    })

    if (!response.success && response.stockCheck && response.stockCheck.length > 0) {
      response.stockCheck.forEach(item => {
        toast.add({
          severity: 'error',
          summary: 'Nedostatek kusů skladem',
          detail: item.message,
          life: 4000,
        })
      })
      isSubmitting.value = false
    }

    return response
  }

  return {
    currentStep,
    values,
    isSubmitting,
    errors,
    meta,
    onlyActiveUpsells,
    totalOrderPrice,
    handleSubmitForm,
    toggleUpsell,
    resetForm,
    checkStock,
    handleSubmit,
    setFieldValue,
    validateStep,
    goToPreviousStep,
  }
})
