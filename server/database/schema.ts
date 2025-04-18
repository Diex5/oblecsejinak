// schema.ts
import { pgTable, serial, jsonb, text, integer, decimal, timestamp, uniqueIndex, boolean } from 'drizzle-orm/pg-core'
import type { InferModel } from 'drizzle-orm'
import { relations } from 'drizzle-orm'
import type { Product } from '../../types/Productor'
// 1. Samostatné tabulky pro barvy a velikosti
export const colors = pgTable('colors', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  hex_code: text('hex_code'),
})

export const sizes = pgTable('sizes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  sort_order: integer('sort_order'),
})

// 2. Hlavní produkt
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  base_price: decimal('base_price', { precision: 10, scale: 2 }), // Základní cena
  images: jsonb('images').$type<string[]>(), // Obrázky produktu
  discount: integer('discount').default(0), // Sleva
  /* discount_type: text('discount_type').default('percent'), */ // Typ slevy (procento nebo částka)
  discount_start: timestamp('discount_start'), // Začátek slevy
  discount_end: timestamp('discount_end'), // Konec slevy
  created_at: timestamp('created_at').defaultNow(),
})

// 3. Varianty produktu s cenou a skladem
export const productVariants = pgTable('product_variants', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').notNull().references(() => products.id),
  color_id: integer('color_id').references(() => colors.id),
  size_id: integer('size_id').references(() => sizes.id),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // Konkrétní cena varianty
  stock: integer('stock').notNull().default(0), // Stav skladu
  sku: text('sku'), // Unikátní identifikátor
}, table => ({
  unq: uniqueIndex('variant_unique').on(table.product_id, table.color_id, table.size_id),
}))

export const productTabs = pgTable('product_tabs', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').notNull().references(() => products.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  sort_order: integer('sort_order').default(0),
})

export const productAccordions = pgTable('product_accordions', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').notNull().references(() => products.id),
  title: text('title').notNull(),
  content: text('content').notNull(),
  sort_order: integer('sort_order').default(0),
})

export const productBenefits = pgTable('product_benefits', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').notNull().references(() => products.id),
  title: text('title').notNull(),
  icon: text('icon'),
  content: text('content').notNull(),
  sort_order: integer('sort_order').default(0),
})

export const productFeatures = pgTable('product_features', {
  id: serial('id').primaryKey(),
  product_id: integer('product_id').notNull().references(() => products.id),
  type: text('type'),
  icon: text('icon'),
  content: text('content').notNull(),
  sort_order: integer('sort_order').default(0),
})

// objednavky

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id'), // ID uživatele, může být null pro objednávky hostů
  status: text('status').notNull().default('new'), // new, paid, shipped, delivered, cancelled
  total_price: integer('total_price').notNull(),
  subtotal: integer('subtotal'), // Cena bez dopravy a daně
  shipping_address: jsonb('shipping_address').$type<{
    name: string
    street: string
    street2?: string
    city: string
    postal_code: string
    country: string
    phone: string
  }>().notNull(),
  billing_address: jsonb('billing_address').$type<{
    name: string
    street: string
    city: string
    postal_code: string
    country: string
    phone: string
    company?: string
    ico?: string
    dic?: string
  }>(),
  shipping_method: text('shipping_method').notNull(),
  shipping_price: integer('shipping_price').notNull(),
  payment_method: text('payment_method').notNull(),
  payment_status: text('payment_status').notNull().default('pending'), // pending, paid, failed
  payment_id: text('payment_id'), // ID platby od poskytovatele plateb
  discount: integer('discount').default(0),
  discount_code: text('discount_code'), // Kód slevy
  note: text('note'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').notNull().references(() => orders.id),
  product_id: integer('product_id').notNull().references(() => products.id),
  variant_id: integer('variant_id').references(() => productVariants.id),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // Cena v době objednávky
  // Případná sleva
  name: text('name').notNull(), // Název produktu v době objednávky
  color_name: text('color_name'), // Název barvy v době objednávky
  size_name: text('size_name'), // Název velikosti v době objednávky
})
// 4. Definice vztahů

export const orderUpsells = pgTable('order_upsells', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').references(() => orders.id), // může být null pro nevázané upselly
  step_id: integer('step_id').notNull(), // ID kroku v upsell flow
  title: text('title').notNull(),
  description: text('description').notNull(),
  cta_text: text('cta_text'), // Call to action text
  fomo_text: text('fomo_text'), // Text zvyšující naléhavost
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Původní cena
  discounted_amount: decimal('discounted_amount', { precision: 10, scale: 2 }), // Snížená cena
  image_url: text('image_url'),
  next: integer('next'), // ID následujícího kroku
  type: text('type').notNull().default('upsell'), // upsell, downsell, order
  context: text('context').notNull().default('checkout'), // checkout, frontend, page
  is_active: boolean('is_active').notNull().default(false), // zda je upsell aktivní
  sort_order: integer('sort_order').default(0),
  accepted: boolean('accepted').default(false), // zda byl upsell přijat
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
})

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
  upsells: many(orderUpsells), // Přidání nové relace

}))

export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
  tabs: many(productTabs),
  accordions: many(productAccordions),
  features: many(productFeatures),
  benefits: many(productBenefits),
}))

export const productTabsRelations = relations(productTabs, ({ one }) => ({
  product: one(products, {
    fields: [productTabs.product_id],
    references: [products.id],
  }),
}))

export const productAccordionsRelations = relations(productAccordions, ({ one }) => ({
  product: one(products, {
    fields: [productAccordions.product_id],
    references: [products.id],
  }),
}))

export const productFeaturesRelations = relations(productFeatures, ({ one }) => ({
  product: one(products, {
    fields: [productFeatures.product_id],
    references: [products.id],
  }),
}))

export const productBenefitsRelations = relations(productBenefits, ({ one }) => ({
  product: one(products, {
    fields: [productBenefits.product_id],
    references: [products.id],
  }),
}))

export const variantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.product_id],
    references: [products.id],
  }),
  color: one(colors, {
    fields: [productVariants.color_id],
    references: [colors.id],
  }),
  size: one(sizes, {
    fields: [productVariants.size_id],
    references: [sizes.id],
  }),
}))

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.product_id],
    references: [products.id],
  }),
  variant: one(productVariants, {
    fields: [orderItems.variant_id],
    references: [productVariants.id],
  }),
}))
export const orderUpsellsRelations = relations(orderUpsells, ({ one }) => ({
  order: one(orders, {
    fields: [orderUpsells.order_id],
    references: [orders.id],
  }),
}))

export type Products = InferModel<typeof products>
export type Variant = InferModel<typeof productVariants>
export type Color = InferModel<typeof colors>
export type Size = InferModel<typeof sizes>

export type ProductTab = InferModel<typeof productTabs>
export type ProductAccordion = InferModel<typeof productAccordions>
export type ProductFeature = InferModel<typeof productFeatures>
export type ProductBenefit = InferModel<typeof productBenefits>

export type ProductWithVariants = Product & {
  variants: Array<
    Variant & {
      color: Color | null
      size: Size | null
    }
  >
  tabs: ProductTab[]
  accordions: ProductAccordion[]
  features: ProductFeature[]
  benefits: ProductBenefit[]
}
export type Order = InferModel<typeof orders>
export type OrderItem = InferModel<typeof orderItems>

// Typy pro vnořené objekty
export type OrderUpsell = InferModel<typeof orderUpsells>

// Aktualizovat typ OrderWithItems, aby zahrnoval upselly
export type OrderWithItems = Order & {
  items: Array<OrderItem & {
    product?: Products
    variant?: Variant & {
      color?: Color
      size?: Size
    }
  }>
  upsells: OrderUpsell[] // Přidání upsellů
}
