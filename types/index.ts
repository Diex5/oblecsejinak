// index.ts

// Product variant types
export interface Color {
  id: string
  name: string
  hex: string
  active: boolean
  price?: number // Optional price specific to this color
  stock?: StockStatus // Optional stock status for this color
}

export interface Size {
  id: string
  label: string
  active: boolean
  price?: number // Optional price specific to this size
  stock?: StockStatus // Optional stock status for this size
}

// Stock status type
export type StockStatus = 'low' | 'medium' | 'high' | 'out'

// Product image type
export interface ProductImage {
  src: string
  alt: string
}

// Product tab type
export interface ProductTab {
  id: string
  label: string
  content: string
}

// Product benefit type
export interface ProductBenefit {
  icon: string
  text: string
}

// Product accordion item type
export interface ProductAccordionItem {
  value: string
  header: string
  content: string
}

// Product recommendation type
export interface ProductRecommendation {
  name: string
  originalPrice: number
  price: number
  image: string
}

// Product variant combination type
export interface ProductVariant {
  colorId?: string
  sizeId?: string
  price: number
  quantity: number
  sku: string // Stock keeping unit for the specific variant
}

// Main product type
export interface Product {
  id: string
  name: string
  price: number // Base price
  originalPrice: number // Original price (for discounts)
  description: string
  rating: number
  reviews: number
  viewers: number
  stock: StockStatus // Overall stock status
  features: string[]
  colors: Color[]
  sizes: Size[]
  images: ProductImage[]
  tabs: ProductTab[]
  benefits: ProductBenefit[]
  accordion: ProductAccordionItem[]
  recommendation: ProductRecommendation
  videoThumbnail: string
  variants: ProductVariant[] // All available variants with specific prices and stock
}

export type User = {
  id: number
  email: string
  passwordHash: string
  fullName: string | null
  createdAt: Date
  updatedAt: Date
}

export type OrderItem = {
  id: number
  productId: number
  variantId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  product: Product
  variant: ProductVariant
}

// Exportuj všechny typy
