import express from "express";
import cors from "cors";
import memberExtendRoutes from "./routes/extend-route.mjs";
import memberPlanRoutes from "./routes/plan-route.mjs";
import membershipRoutes from './routes/membership-routes.mjs'

import dotenv from "dotenv";
import mongoose from 'mongoose'

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/extend", memberExtendRoutes);
app.use("/api/plan", memberPlanRoutes);
app.use("/api/membership", membershipRoutes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log('connected to mongodb')
})


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
