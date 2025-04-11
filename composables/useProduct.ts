import type { Products, ProductWithVariants } from '~/server/database/schema'

export const useProduct = defineStore('product', () => {
  const product = ref()

  async function fetchProduct (slug: string) {
    const { data, error } = await useFetch<ProductWithVariants>(`/api/products/${slug}`)

    if (error.value) {
      console.error('Error fetching product:', error.value)
      return
    }

    product.value = data.value
    console.log('Product data:', product.value)
  }

  return {
    product,
    fetchProduct,
  }
})
