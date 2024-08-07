import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
const stripeRouter = express.Router()



import { checkAuth } from '../middleware/checkAuth.mjs'
import MemberPlan from '../models/memberPlan.mjs'
import User from '../models/user.mjs'


stripeRouter.post('/membership_create', checkAuth, async (req, res) => {
  const { plan, userId, email } = req.body
  console.log('membership_create stripe')

  const customer = await stripe.customers.create(
    {
      metadata: {
        userId: req.body.userId,
        customer_email: req.body.email,
        plan: JSON.stringify(req.body.plan),
      },
    },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  )

  const session = await stripe.checkout.sessions.create(
    {
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.title,
              description: plan.duration,
              metadata: {
                id: userId,
                duration: plan.duration,
              },
            },
            unit_amount: plan.amount * 100,
          },
          quantity: 1,
        },
      ],
      customer: customer.id,

      success_url:
        `${process.env.FRONTEND_URL}/success`,

      cancel_url: `${process.env.FRONTEND_URL}`,
    },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  )

  res.send({ url: session.url })
  // res.sendStatus(200)
})

const createMemberPlan = async (customer, data) => {
  const memberData = JSON.parse(customer.metadata.plan)


  const newMemberPlan = new MemberPlan({
    userId: customer.metadata.userId,
    stripeCustomerId: data.customer,
    plan: memberData,
    payment_status: data.payment_status,
  })
  try {
    const memberPlanSaved = await newMemberPlan.save()

    let userFind = await User.findById(customer.metadata.userId)
    userFind.plan.push(memberPlanSaved)
    await userFind.save()


  } catch (err) {
    console.log(err)
  }
}

stripeRouter.post(
  '/webhook',

  express.json({ type: 'application/json' }),
  async (req, res) => {
    let eventType
    let data
    let webhookSecret
    webhookSecret = process.env.STRIPE_WEB_HOOK

    if (webhookSecret) {

      let event
      let signature = req.headers['stripe-signature']

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        )
        console.log('webhook verified')
      } catch (err) {
        console.log(`  Webhook signature verification failed:  ${err}`)
        return res.sendStatus(400)
      }

      data = event.data.object
      eventType = event.type
    }

    if (eventType === 'checkout.session.completed') {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            createMemberPlan(customer, data)
          } catch (err) {
            console.log(err)
          }
        })
        .catch((err) => console.log(err.message))
    }

    res.status(200).end()
  }
)

export default stripeRouter
