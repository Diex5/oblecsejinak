// server/api/verify-payment.get.ts
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)
  const query = getQuery(event)
  const paymentIntentId = query.payment_intent as string

  if (!paymentIntentId) {
    throw createError({
      statusCode: 400,
      message: 'Missing payment_intent',
    })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    /* const metadata = paymentIntent.metadata || {}; */

    return {
      success: paymentIntent.status === 'succeeded',
      status: paymentIntent.status,
      /* step: metadata.step */
    }
  }
  catch (e) {
    throw createError({
      statusCode: 400,
      message: e instanceof Error ? e.message : 'Unknown error',
    })
  }
})
