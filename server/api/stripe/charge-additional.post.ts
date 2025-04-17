// server/api/charge-additional.post.ts
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)
  const body = await readBody(event)
  const origin = event.node.req.headers.origin
  console.log(body)
  if (!body.amount || body.amount <= 0) {
    return createError({
      statusCode: 400,
      message: 'Invalid amount',
    })
  }

  try {
    try {
      const offSessionPayment = await stripe.paymentIntents.create({
        amount: body.amount * 100,
        currency: 'czk',
        customer: body.customerId,
        payment_method: body.paymentMethodId,
        off_session: true,
        confirm: true,
        metadata: {
          step: body.step,
        },
      })

      return { success: true }
    }
    catch (error) {
      const stripeError = error as any
      if (stripeError.code === 'authentication_required') {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: body.amount * 100,
          currency: 'czk',
          customer: body.customerId,
          payment_method: body.paymentMethodId,
          confirm: true,
          return_url: `${origin}/success`,
          metadata: {
            step: body.step,
          },
        })

        if (paymentIntent.status === 'requires_action') {
          return {
            requiresAction: true,
            clientSecret: paymentIntent.client_secret,
          }
        }
      }
      else {
        throw error
      }
    }

    return { success: true }
  }
  catch (e) {
    return createError({
      statusCode: 400,
      message: e instanceof Error ? e.message : 'Unknown error',
    })
  }
})
