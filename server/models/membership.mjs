import mongoose from 'mongoose'

const Schema = mongoose.Schema

const membershipSchema = new Schema({
  title: { type: String },
  amount: { type: Number },
  duration: { type: String },
})

export default mongoose.model('Membership', membershipSchema)
