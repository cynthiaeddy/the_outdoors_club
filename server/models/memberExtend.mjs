import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MemberExtendSchema = new Schema({
  title: { type: String },
  amount: { type: Number },
  duration: { type: String },
  url: { type: String },
})

// module.exports = mongoose.model('MemberExtend', MemberExtendSchema)
export default mongoose.model('MemberExtend', MemberExtendSchema)

