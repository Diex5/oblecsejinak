// server/api/create-payment-intent.get.ts
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async event => {
  const stripe = await useServerStripe(event)
  const body = await readBody(event)
  const userData = body.userData
  const amount = body.amount

  console.log(body)
  if (!userData || !userData.email || !userData.name) {
    return {
      clientSecret: null,
      customerId: null,
      error: 'Invalid user data',
    }
  }
  if (!amount || amount <= 16) {
    return {
      clientSecret: null,
      customerId: null,
      error: 'Invalid amount',
    }
  }
  try {
    const customer = await stripe.customers.create({
      email: userData.email,
      name: userData.name,
      metadata: {
        uuid: userData.uuid,
      },
      address: {
        country: 'CZ',
      },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      currency: body.currency,
      amount: amount * 100,
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
      /*  metadata: {
        ...body.metadata,
        items: JSON.stringify(body.metadata.items || []),
      }, */
      setup_future_usage: 'off_session', // Pro uložení karty
    })
    console.log(customer.id)
    return {
      clientSecret: paymentIntent.client_secret,
      customerId: customer.id,
      error: null,
    }
  }
  catch (e) {
    return {
      clientSecret: null,
      customerId: null,
      error: e,
    }
  }
})
