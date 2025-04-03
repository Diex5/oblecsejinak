import { useToggle, useLocalStorage } from '@vueuse/core'
import type { Product, ProductVariant, OrderItem } from '@/types'

export const useCart = defineStore('cart', () => {
  const [isCartOpened, toggleCart] = useToggle(false)

  // State
  const cartItems = useLocalStorage<OrderItem[]>('cartItems', [])

  // Getters
  const totalQuantity = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0),
  )

  const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) => total + item.totalPrice, 0),
  )

  // Actions

  const addToCart = (product: Product, variant: any, quantity: number = 1) => {
  /*   const existingItem = cartItems.value.find(
      item => item.productId === product.id && item.colorVariantId === variant.colorId && item.sizeVariantId === variant.sizeId,
    )
    if (!isProductAvailable(variant, quantity, existingItem?.quantity)) {
      return window.alert('Produkt není dostupný v požadovaném množství.')
    }
    if (existingItem) {
      existingItem.quantity += quantity
      existingItem.totalPrice += variant.price * quantity
      console.log('Pocet kusu zvysen')
    } */
    cartItems.value.push({
      id: Math.random(), // Dočasné ID, v produkci se nahradí ID z backendu
      orderId: 0, // Prozatím není přiřazen žádné objednávce
      productId: product.id,
      colorVariantId: 1,
      sizeVariantId: 2,
      quantity,
      unitPrice: 232,
      totalPrice: 323 * quantity,
      product,
      variant,
    })
    toggleCart()
  }
  function isProductAvailable (variant: ProductVariant, quantity: number, itemQty?: number): boolean {
    // Kontrola, zda je produkt skladem
    const isInStock = variant.quantity > 0

    // Kontrola, zda požadované množství nepřesahuje dostupné množství varianty
    const isQuantityValid = variant.quantity >= quantity

    const existingQuantity = itemQty || 0

    // Vrácení výsledku validace
    return isInStock && isQuantityValid && (existingQuantity + quantity) <= variant.quantity
  }
  const removeFromCart = (productId: number, variantId: number) => {
    cartItems.value = cartItems.value.filter(
      item => !(item.productId === productId && item.variantId === variantId),
    )
  }
  const isAnyVariantInStock = computed(() =>
    cartItems.value.some(item => item.variant.quantity > 0),
  )
  const updateQuantity = (productId: number, variantId: number, quantity: number) => {
    const item = cartItems.value.find(
      item => item.productId === productId && item.variantId === variantId,
    )

    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId, variantId)
      }
      else {
        item.quantity = quantity
        item.totalPrice = item.unitPrice * quantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  return {
    // State
    isCartOpened,
    cartItems,

    // Getters
    totalQuantity,
    totalPrice,
    isAnyVariantInStock,
    // Actions
    toggleCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
