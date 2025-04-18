// server/api/products/check-stock.ts
import { eq, and } from 'drizzle-orm'
import { productVariants } from '~/server/database/schema'

export default defineEventHandler(async event => {
  try {
    const body = await readBody<{
      items: {
        product_id: string
        variant_id: string
        quantity: number
      }[]
    }>(event)

    if (!body.items || body.items.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Chybí položky pro kontrolu skladu.',
      })
    }

    const db = useDrizzle()

    const stockChecks = body.items.map(item => {
      return db.query.productVariants.findFirst({
        where: and(
          eq(productVariants.id, Number(item.variant_id)),
          eq(productVariants.product_id, Number(item.product_id)),
        ),
      })
    })

    const variants = await Promise.all(stockChecks)

    const stockIssues = []

    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i]
      const item = body.items[i]

      if (!variant) {
        stockIssues.push({
          product_id: item.product_id,
          variant_id: item.variant_id,
          message: `Varianta produktu s ID ${item.variant_id} neexistuje.`,
        })
      }
      else if (variant.stock < item.quantity) {
        stockIssues.push({
          product_id: item.product_id,
          variant_id: item.variant_id,
          message: `Pro variantu ${item.variant_id} je skladem pouze ${variant.stock} ks, ale požadováno ${item.quantity} ks.`,
        })
      }
    }

    if (stockIssues.length > 0) {
      return {
        success: false,
        stockCheck: stockIssues,
      }
    }

    return {
      success: true,
      message: 'Všechny položky jsou skladem.',
    }
  }
  catch (error: any) {
    /* console.error('Chyba při kontrole skladu:', error) */
    return {
      success: false,
      stockCheck: [
        {
          message: error.message || 'Došlo k chybě při kontrole skladu.',
        },
      ],
    }
  }
})
