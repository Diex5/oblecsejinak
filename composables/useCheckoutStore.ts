import { defineStore } from 'pinia'
import * as yup from 'yup'
import { useForm } from 'vee-validate'

interface UpsellItem {
  id: string
  price: number
  title: string
  isSelected: boolean
}

export const useCheckoutStore = defineStore('checkout', () => {
  const currentStep = ref(1)

  const { totalPrice } = storeToRefs(useCart())

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
      const fields = ['firstName', 'lastName', 'email', 'phone']
      const results = await Promise.all(fields.map(field => validateField(field)))
      const isValid = results.every(r => r.valid)
      if (isValid) currentStep.value = 2
      return isValid
    }

    if (currentStep.value === 2) {
      const fields = ['street', 'city', 'zip', 'country', 'shippingMethod']
      const results = await Promise.all(fields.map(field => validateField(field)))
      const isValid = results.every(r => r.valid)
      return isValid
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

    return totalPrice.value + shippingPrice + upsellTotal
  })
  console.log(totalPrice)
  return {
    currentStep,
    values,
    isSubmitting,
    errors,
    meta,
    onlyActiveUpsells,
    totalOrderPrice,
    toggleUpsell,
    resetForm,
    handleSubmit,
    setFieldValue,
    validateStep,
    goToPreviousStep,
  }
})
