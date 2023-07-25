import Stripe from 'stripe'
// require('dotenv').config({ path: './.env' })
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// require('dotenv').config({ path: './.env' })
// import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '.env') });

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
