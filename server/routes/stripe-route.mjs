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


// stripeRouter.post('/membership_create', checkAuth, async (req, res) => {
//   const { plan, userId, email } = req.body
//   console.log('membership_create stripe')

//   const customer = await stripe.customers.create(
//     {
//       metadata: {
//         userId: req.body.userId,
//         customer_email: req.body.email,
//         plan: JSON.stringify(req.body.plan),
//       },
//     },
//     { apiKey: process.env.STRIPE_SECRET_KEY }
//   )

//   const session = await stripe.checkout.sessions.create(
//     {
//       mode: 'payment',
//       payment_method_types: ['card'],

//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: plan.title,
//               description: plan.duration,
//               metadata: {
//                 id: userId,
//                 duration: plan.duration,
//               },
//             },
//             unit_amount: plan.amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       customer: customer.id,

//       success_url:
//         `${process.env.FRONTEND_URL}/success`,

//       cancel_url: `${process.env.FRONTEND_URL}`,
//     },
//     { apiKey: process.env.STRIPE_SECRET_KEY }
//   )

//   res.send({ url: session.url })
//   // res.sendStatus(200)
// })
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

stripeRouter.post('/membership_create', checkAuth, async (req, res) => {
  const { plan, userId, email } = req.body;
  console.log('membership_create stripe');

  try {
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        customer_email: req.body.email,
        plan: JSON.stringify(req.body.plan),
      },
    });

    const session = await stripe.checkout.sessions.create({
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
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Error creating Stripe session:', err);
    res.status(500).json({ error: 'Failed to create Stripe session' });
  }
});


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
    let webhookSecret
    webhookSecret = process.env.STRIPE_WEB_HOOK

      try {
        const signature = req.headers['stripe-signature']
        const event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          webhookSecret
        )
        console.log('webhook verified')

        switch (event.type) {
          case 'checkout.session.completed':
            const session = event.data.object;

            // Process the completed checkout session (e.g., update database, fulfill orders)
            await handleCheckoutSessionCompleted(session);

            break;
          // Handle other event types as needed
          default:
            console.log(`Unhandled event type: ${event.type}`);
        }

           // Respond with a 200 status code to acknowledge receipt of the event
        res.status(200).end();
      } catch (error) {
        console.error('Error processing webhook event:', error.message);
        // Respond with a 400 status code to indicate an error
        res.status(400).send(`Webhook Error: ${error.message}`);
      }
    });

async function handleCheckoutSessionCompleted(session) {
  stripe.customers
    .retrieve(session.customer)
    .then(async (customer) => {
      try {
        await createMemberPlan(customer, session);
      } catch (err) {
        console.log(err);
      }
      // Example: Update database or fulfill orders based on the completed session
      // Example: Send a confirmation email to the customer
    })
}


export default stripeRouter
