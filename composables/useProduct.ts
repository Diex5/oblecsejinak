import type { ProductWithVariants } from '~/server/database/schema'

export const useProduct = defineStore('product', () => {
  const product = ref<ProductWithVariants>() || null
  const selectedColorId = ref()
  const selectedSizeId = ref()

  async function fetchProduct (slug: string) {
    const { data, error } = await useFetch<ProductWithVariants>(`/api/products/${slug}`)

    if (error.value) {
      console.error('Error fetching product:', error.value)
      return
    }

    product.value = data.value
    selectedColorId.value = product.value?.variants[0]?.color_id
    selectedSizeId.value = product.value?.variants[0]?.size_id
    console.log('Product data:', product.value)
  }

  const colors = computed(() => {
    const uniqueColors: { id: number, name: string, hex: string }[] = []
    const colorIds = new Set()

    product.value?.variants.forEach(variant => {
      if (variant.color && !colorIds.has(variant.color.id)) {
        colorIds.add(variant.color.id)
        uniqueColors.push({
          id: variant.color.id,
          name: variant.color.name,
          hex: variant.color.hex_code ?? '',
        })
      }
    })

    return uniqueColors
  })

  const sizes = computed(() => {
    const uniqueSizes: { id: number, label: string }[] = []
    const sizeIds = new Set()

    product.value?.variants.forEach(variant => {
      if (variant.size && !sizeIds.has(variant.size.id)) {
        sizeIds.add(variant.size.id)
        uniqueSizes.push({
          id: variant.size.id,
          label: variant.size.name,
        })
      }
    })

    return uniqueSizes
  })

  const currentVariant = computed(() => {
    return product.value?.variants.find(
      variant => variant.color_id === selectedColorId.value && variant.size_id === selectedSizeId.value,
    )
  })

  const availableSizesForSelectedColor = computed(() => {
    if (!product.value) return []

    // Získáme ID velikostí, které mají variantu s vybranou barvou
    const sizeIds = product.value.variants
      .filter(variant => variant.color_id === selectedColorId.value && variant.stock > 0)
      .map(variant => variant.size_id)

    // Vrátíme objekty velikostí s příznakem dostupnosti
    return sizes.value.map(size => ({
      ...size,
      available: sizeIds.includes(size.id),
    }))
  })

  // Dostupné barvy pro vybranou velikost
  const availableColorsForSelectedSize = computed(() => {
    if (!product.value) return []

    // Získáme ID barev, které mají variantu s vybranou velikostí
    const colorIds = product.value.variants
      .filter(variant => variant.size_id === selectedSizeId.value && variant.stock > 0)
      .map(variant => variant.color_id)

    // Vrátíme objekty barev s příznakem dostupnosti
    return colors.value.map(color => ({
      ...color,
      available: colorIds.includes(color.id),
    }))
  })
  const isInStock = computed(() => {
    return !!currentVariant.value && currentVariant.value.stock > 0
  })
  // Kontrola, jestli je aktuální kombinace barvy a velikosti dostupná
  const isVariantAvailable = computed(() => {
    return !!currentVariant.value
  })

  // Aktuální cena z vybrané varianty
  const price = computed(() => {
    return currentVariant.value?.price || product.value?.base_price || 0
  })

  return {
    product,
    selectedColorId,
    selectedSizeId,
    sizes,
    currentVariant,
    availableSizesForSelectedColor,
    availableColorsForSelectedSize,
    isVariantAvailable,
    colors,
    isInStock,
    fetchProduct,
  }
})
