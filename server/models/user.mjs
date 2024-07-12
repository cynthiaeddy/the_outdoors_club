import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    startDatePlan: { type: Date },
    address: { type: String },
    aptNo: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    phoneNo: { type: Number },
    plan: [{ type: Schema.Types.ObjectId, ref: 'MemberPlan' }],
    newsletter: {
      type: String,
      enum: ['email', 'post'],
      default: 'email',
    },
    volunteer: { type: Boolean },

    notes: { type: String },

    agreeToTerms: { type: Boolean },

    role: {
      type: String,
      enum: ['user', 'admin', 'leader', 'volunteer'],
      required: true,
      default: 'user',
    },
    stripe_customer_id: {
      type: String
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },

    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
