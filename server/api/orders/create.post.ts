// server/api/orders/create.ts
import { eq, and } from 'drizzle-orm'
import { orders, orderItems, productVariants } from '~/server/database/schema'
import type { OrderWithItems } from '~/server/database/schema'

export default defineEventHandler(async event => {
  try {
    // 1. Získání dat z požadavku
    const body = await readBody<OrderWithItems>(event)

    // Základní validace vstupních dat
    if (!body) {
      throw createError({ statusCode: 400, message: 'Chybějící data objednávky' })
    }

    if (!body.items || body.items.length === 0) {
      throw createError({ statusCode: 400, message: 'Objednávka musí obsahovat alespoň jednu položku' })
    }

    if (!body.shipping_address) {
      throw createError({ statusCode: 400, message: 'Chybí doručovací adresa' })
    }

    // 2. Připravení DB
    const db = useDrizzle()

    // 3. Kontrola dostupnosti zboží
    const stockChecks = []
    let totalPrice = Number(body.shipping_price) || 0

    for (const item of body.items) {
      if (!item.product_id || !item.variant_id || !item.quantity) {
        throw createError({ statusCode: 400, message: 'Neplatné údaje u některé z položek' })
      }

      totalPrice += (Number(item.price) * Number(item.quantity))

      stockChecks.push(
        db.query.productVariants.findFirst({
          where: and(
            eq(productVariants.id, item.variant_id),
            eq(productVariants.product_id, item.product_id),
          ),
        }),
      )
    }

    // Zkontrolovat dostupnost všech položek najednou
    const variants = await Promise.all(stockChecks)

    // Validace dostupnosti zboží
    for (let i = 0; i < variants.length; i++) {
      const variant = variants[i]
      const item = body.items[i]

      if (!variant) {
        throw createError({
          statusCode: 400,
          message: `Varianta s ID ${item.variant_id} neexistuje`,
        })
      }

      if (variant.stock < item.quantity) {
        throw createError({
          statusCode: 400,
          message: `Nedostatek zboží na skladě pro "${item.name}" (k dispozici: ${variant.stock}, požadováno: ${item.quantity})`,
        })
      }
    }

    // Připravíme objekt pro vytvoření objednávky podle schématu
    const orderData = {
      ...(orders.user_id ? { user_id: body.user_id } : {}),

      status: 'new',
      total_price: Number(body.total_price), // Převedeme na string, pokud schéma očekává string
      subtotal: Number(body.subtotal || 0), // Převedeme na string, pokud schéma očekává string
      shipping_address: body.shipping_address,
      billing_address: body.billing_address || body.shipping_address,
      shipping_method: body.shipping_method,
      shipping_price: Number(body.shipping_price || 0), // Opět převod na string
      payment_method: body.payment_method,
      payment_status: 'pending',
      discount: Number(body.discount || 0),
      discount_code: body.discount_code || null,
      // Převedeme na string, pokud schéma očekává string
      note: body.note || '',
      created_at: new Date(),
      updated_at: new Date(),
    }

    // 4. Vytvoření objednávky v transakci
    const result = await db.transaction(async tx => {
      // Vytvořit objednávku
      const [newOrder] = await tx.insert(orders).values(orderData).returning()

      // Vytvořit položky objednávky
      for (const item of body.items) {
        await tx.insert(orderItems).values({
          order_id: newOrder.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price: String(item.price), // Převod na string podle schématu
          name: item.name,
          color_name: item.color_name || null,
          size_name: item.size_name || null,
        })
      }

      // Aktualizovat stav skladu
      for (let i = 0; i < variants.length; i++) {
        const variant = variants[i]
        // Kontrola, zda variant existuje, přestože jsme tuto kontrolu již provedli výše
        // TypeScript stále potřebuje tuto kontrolu zde pro typovou bezpečnost
        if (!variant) {
          continue // Tento kód se nikdy neprovede díky předchozí kontrole, ale uspokojí TypeScript
        }

        const item = body.items[i]

        await tx.update(productVariants)
          .set({ stock: variant.stock - item.quantity })
          .where(eq(productVariants.id, variant.id))
      }

      return newOrder
    })

    // 5. Vrátit výsledek
    return {
      success: true,
      order_id: result.id,
      message: 'Objednávka byla úspěšně vytvořena',
    }
  }
  catch (error: unknown) {
    // Lepší zpracování chyb
    console.error('Chyba při vytváření objednávky:', error)

    if (typeof error === 'object' && error !== null && 'statusCode' in error && 'message' in error) {
      // Pokud je to createError, předej dál
      throw error
    }
    else {
      // Univerzální chyba
      throw createError({
        statusCode: 500,
        message: 'Došlo k chybě při zpracování objednávky',
      })
    }
  }
})
