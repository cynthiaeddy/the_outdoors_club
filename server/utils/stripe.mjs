import Stripe from 'stripe'
require('dotenv').config({ path: './.env' })

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
