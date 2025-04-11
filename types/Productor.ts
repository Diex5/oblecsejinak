export interface TextContent {
  html: string
}

export interface Tab {
  _id: string
  title: string
  type: boolean
  content: TextContent
}

export interface Image {
  url: string
}

export interface ProductImage {
  images: Image[]
}

export interface Color {
  _id: string
  color_code: string
  name: string
}

export interface Size {
  _id: string
  name: string
}

export interface VariantStock {
  color_id: {
    name: string
    color_code: string
  }
  size_id: {
    name: string
  }
  price: number
  stock: number
}

export interface Product {
  _id: string
  name: string
  slugify: string
  description: string
  default_price: number
  discount_percentage?: number
  discount_valid_from?: string
  discount_valid_to?: string
  color: Color
  size: Size
  is_variant_stock: VariantStock[]
  tabs: Tab[]
  images: ProductImage
}

export interface ProductsResult {
  Products: {
    items: Product[]
  }
}
