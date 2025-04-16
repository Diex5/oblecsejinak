// stores/useCart.ts
import { defineStore } from 'pinia'
import { useLocalStorage, useToggle } from '@vueuse/core'
import type { ProductWithVariants, Variant } from '~/server/database/schema'

// Rozhraní pro položku košíku
export interface CartItem {
  productId: number
  variantId: number
  name: string
  price: number
  quantity: number
  max_quantity?: number
  color?: {
    id: number
    name: string
    hex_code?: string
  } | null
  size?: {
    id: number
    name: string
  } | null
  image?: string
}
interface Discount {
  code: string
  name: string
  value: number // Procentuální sleva (např. 20 pro 20%)
  isActive: boolean // Stav, zda je sleva aktivní
  discountedAmount: number // Jaká částka byla odečtena

}
export const useCart = defineStore('cart', () => {
  const toast = useToast()
  const [isCartOpened, toggleCart] = useToggle()

  const discount = useLocalStorage<Discount>('discount', {
    code: '',
    name: '',
    value: 0,
    isActive: false,
    discountedAmount: 0, // Inicializace s nulovou hodnotou pro sleva

  })

  // Použití useLocalStorage pro ukládání košíku
  const cartItems = useLocalStorage<CartItem[]>('cart-items', [])

  // Pomocná funkce pro nalezení indexu položky v košíku
  function findCartItemIndex (productId: number, variantId: number): number {
    return cartItems.value.findIndex(
      item => item.productId === productId && item.variantId === variantId,
    )
  }

  // Přidání produktu do košíku
  function addToCart (item: ProductWithVariants, variant: Variant, price: number, quantity: number = 1,
  ) {
    // Kontrola, zda je dostatek zásob
    if (variant.stock < quantity) {
      toast.add({ severity: 'warn', summary: 'Ajaj něco se nepodařilo !', detail: 'Požadovaný počet zboží není skladem...', life: 3000 })
    }
    const existingItemIndex = findCartItemIndex(item.id, variant.id)

    if (existingItemIndex !== -1) {
      // Položka již existuje, aktualizujeme množství
      const newQuantity = cartItems.value[existingItemIndex].quantity + quantity

      // Kontrola, zda je dostatek zásob pro zvýšení množství
      if (variant.stock < newQuantity) {
        toast.add({ severity: 'warn', summary: 'Ajaj něco se nepodařilo !', detail: 'Požadovaný počet zboží není skladem...', life: 3000 })
      }
      else {
        cartItems.value[existingItemIndex].quantity = newQuantity

        toast.add({ severity: 'info', summary: 'Počet kusů byl navýšen !', detail: 'Uspěšně přidáno do košíku...', life: 3000 })
      }
    }
    else {
      // Vytvoření nové položky košíku
      const cartItem: CartItem = {
        productId: item.id,
        variantId: variant.id,
        name: item.name,
        price: Number(price),
        quantity: quantity,
        max_quantity: variant.stock,
        color: variant.color || null,
        size: variant.size || null,
        /*  image: product.images && product.images.length > 0 ? product.images[0] : undefined, */
      }

      cartItems.value.push(cartItem)
      toast.add({ severity: 'success', summary: 'Zboží přidáno do košíku !', detail: 'Uspěšně přidáno do košíku...', life: 3000 })
      toggleCart()
    }
  }

  // Odstranění položky z košíku
  function removeItem (productId: number, variantId: number) {
    const itemIndex = findCartItemIndex(productId, variantId)

    if (itemIndex !== -1) {
      cartItems.value.splice(itemIndex, 1)
    }
  }

  // Aktualizace množství položky v košíku
  function updateQuantity (productId: number, variantId: number, quantity: number, maxStock: number) {
    if (quantity <= 0) {
      removeItem(productId, variantId)
      return
    }

    // Kontrola, zda je dostatek zásob
    if (quantity > maxStock) {
      throw new Error(`Nedostatek zásob. K dispozici je pouze ${maxStock} kusů.`)
    }

    const itemIndex = findCartItemIndex(productId, variantId)

    if (itemIndex !== -1) {
      cartItems.value[itemIndex].quantity = quantity
    }
  }

  // Vyprázdnění košíku
  function clearCart () {
    cartItems.value = []
    removeDiscount ()
  }

  function applyDiscount (code: string, name: string, value: number) {
    const subtotal = cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    const discountedAmount = (subtotal * value) / 100

    if (code === 'SALE10') {
      discount.value = {
        code,
        name,
        value,
        isActive: true,
        discountedAmount, // Spočítáme a uložíme částku slevy
      }
      toast.add({ severity: 'success', summary: 'Sleva aplikována', detail: 'Sleva 10 % byla úspěšně aplikována.', life: 3000 })
    }
    else {
      toast.add({ severity: 'error', summary: 'Neplatný kód', detail: 'Zadaný kód není platný.', life: 3000 })
    }
  }

  // Funkce pro odebrání slevy
  function removeDiscount () {
    discount.value = {
      code: '',
      name: '',
      value: 0,
      isActive: false,
      discountedAmount: 0, // Resetujeme hodnotu slevy
    }
    toast.add({ severity: 'success', summary: 'Sleva byla odebrána !', detail: '', life: 3000 })
  }
  // Výpočet celkové ceny košíku
  const totalPrice = computed(() => {
    const subtotal = cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    const discountAmount = (discount.value.isActive) ? (subtotal * discount.value.value) / 100 : 0
    return subtotal - discountAmount
  })

  // Výpočet celkového počtu položek v košíku
  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  })

  return {
    cartItems,
    addToCart,
    isCartOpened,
    removeItem,
    discount,
    updateQuantity,
    clearCart,
    applyDiscount,
    toggleCart,
    removeDiscount,
    totalPrice,
    totalItems,
  }
})
