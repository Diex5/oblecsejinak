import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)
  const body = await readBody(event)

  if (!body.paymentIntentId) {
    throw createError({
      statusCode: 400,
      message: 'Payment intent ID is required',
    })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(body.paymentIntentId)

    return {
      customerId: paymentIntent.customer,
      paymentMethodId: paymentIntent.payment_method,
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message,
    })
  }
})
