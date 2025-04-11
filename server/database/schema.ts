// schema.ts
import { pgTable, serial, jsonb, text, integer, decimal, timestamp, uniqueIndex } from 'drizzle-orm/pg-core'
import type { InferModel } from 'drizzle-orm'
import { relations, sql } from 'drizzle-orm'
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

// 4. Definice vztahů
export const productsRelations = relations(products, ({ many }) => ({
  variants: many(productVariants),
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
export type Products = InferModel<typeof products>
export type Variant = InferModel<typeof productVariants>
export type Color = InferModel<typeof colors>
export type Size = InferModel<typeof sizes>

export type ProductWithVariants = Product & {
  variants: Array<
    Variant & {
      color: Color | null
      size: Size | null
    }
  >
}
