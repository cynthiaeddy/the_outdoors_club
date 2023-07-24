import mongoose from 'mongoose'

const Schema = mongoose.Schema

const oneYearFromNow = function () {
  const timeObject = new Date()
  timeObject.setFullYear(timeObject.getFullYear() + 1)
  return timeObject
}

const twoYearsFromNow = function () {
  const timeObject = new Date()
  timeObject.setFullYear(timeObject.getFullYear() + 2)
  return timeObject
}

const memberPlanSchema = new Schema(
  {
    userId: { type: String, required: true },
    stripeCustomerId: { type: String },
    plan: [
      {
        _id: { type: String },
        title: { type: String },
        amount: { type: Number },
        duration: { type: String },
        type: {
          type: String,
          enum: ['new', 'renew'],
          default: 'new',
        },
        source: {
          type: String,
          enum: ['stripe', 'check', 'cash', 'paypal'],
          default: 'stripe',
        },
        startDate: { type: Date, default: new Date() },
        endDate: {
          type: Date,
          default: oneYearFromNow,
        },
        active: {
          type: String,
          enum: ['active', 'not active'],
          default: 'active',
        },
      },
    ],

    payment_status: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model('MemberPlan', memberPlanSchema)
