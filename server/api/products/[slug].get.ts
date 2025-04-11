// server/api/products/[id].ts
import { eq } from 'drizzle-orm'
import { products } from '~/server/database/schema'

export default defineEventHandler(async event => {
  const slug = event.context.params?.slug // Konvertujeme na číslo
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Invalid product slug' })
  }

  const db = useDrizzle()
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: {
        variants: {
          with: {
            color: true,
            size: true,
          },
        },
      },
    })
    return product
  }
  catch (e) {
    console.log(e)
  }
})
