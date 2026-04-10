import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PLANS = {
  starter: { price: 2900, name: 'Starter — Site + 1 agent' },
  pro: { price: 9900, name: 'Pro — Site + 3 agents' },
  unlimited: { price: 19900, name: 'Unlimited — Site + agents illimités' },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })

  const { plan, email, businessId, agents } = req.body
  if (!plan || !PLANS[plan]) return res.status(400).json({ success: false, error: 'Invalid plan' })
  if (!email) return res.status(400).json({ success: false, error: 'Email required' })

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: PLANS[plan].price,
          recurring: { interval: 'month' },
          product_data: { name: PLANS[plan].name },
        },
        quantity: 1,
      }],
      metadata: { businessId: businessId || '', agents: JSON.stringify(agents || []), plan },
      success_url: `${req.headers.origin || 'https://novaos.io'}/dashboard?setup=success`,
      cancel_url: `${req.headers.origin || 'https://novaos.io'}/?cancelled=true`,
    })

    return res.status(200).json({ success: true, data: { url: session.url } })
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message })
  }
}
