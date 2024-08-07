import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import path from 'path'

import memberExtendRoutes from "./routes/extend-route.mjs";
import memberPlanRoutes from "./routes/plan-route.mjs";
import membershipRoutes from './routes/membership-route.mjs'
import stripeRoutes from './routes/stripe-route.mjs'
import userRoutes from './routes/user-route.mjs'
import passwordRoutes from './routes/password-route.mjs'
import contactUsRoutes from './routes/contact-us-route.mjs'

dotenv.config({ path: './.env' });


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.enable('trust proxy')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})
// app.use('/api/webhook', bodyParser.raw({ type: '*/*' }))
app.use('/api/stripe/webhook', bodyParser.raw({ type: '*/*' }))
app.use(express.json({ limit: '50mb' }))

app.use("/api/extend", memberExtendRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plan", memberPlanRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/contact", contactUsRoutes);
app.use("/api/stripe", stripeRoutes)
// app.use('/api/membership/webhook', bodyParser.raw({ type: '*/*' }))




mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('connected to mongodb')
})


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
