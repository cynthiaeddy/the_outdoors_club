import MemberPlan from '../models/memberPlan.mjs'
// const User = require('../models/user')

export const updateUserPlanEndDate = async (req, res) => {
  const id = req.params.id
  const filter = { _id: req.params.id }

  const {
    _id,
    title,
    amount,
    duration,
    startDate,
    type,
    source,
    endDate,
    active,
  } = req.body

  try {
    const fieldsToUpdate = {
      _id,
      title,
      amount,
      duration,
      startDate,
      type,
      source,
      endDate: new Date(endDate),
      active,
    }

    const member = await MemberPlan.findOneAndUpdate(
      { _id: id },
      { plan: fieldsToUpdate },

      { new: true }
    )

    res.json(member)
  } catch (err) {
    console.log(err)
  }
}

// export const updateUser = async (req, res) => {
//   const id = req.params.id

//   const {
//     _id,
//     title,
//     amount,
//     duration,
//     startDate,
//     type,
//     source,
//     endDate,
//     active,
//   } = req.body

//   try {
//     const fieldsToUpdate = {
//       _id,
//       title,
//       amount,
//       duration,
//       startDate,
//       type,
//       source,
//       endDate,
//       active,
//     }

//     const member = await MemberPlan.findOneAndUpdate(
//       { _id: id },
//       { plan: fieldsToUpdate },

//       { new: true }
//     )

//     res.json(member)
//   } catch (err) {
//     console.log(err)
//   }
// }

// export const getMemberPlan = async (req, res) => {
//   const id = req.params.id

//   try {
//     const plan = await MemberPlan.findById(id)
//     res.send(plan)
//   } catch (err) {
//     console.log(err)
//   }
// }

export const getAllMemberPlans = async (req, res) => {
  try {
    const plans = await MemberPlan.find()
    res.send(plans)
  } catch (err) {
    console.log(err)
  }
}
// export const addNewPlan = async (req, res) => {
//   const {
//     userId,
//     title,
//     duration,
//     startDate,
//     endDate,
//     amount,
//     type,
//     source,
//     active,
//   } = req.body

//   try {
//     const newMemberPlan = new MemberPlan({
//       userId,
//       plan: {
//         title,
//         duration,
//         startDate,
//         endDate,
//         amount,
//         type,
//         source,
//         active,
//       },
//     })

//     const newPlanSaved = await newMemberPlan.save()
//     const user = await User.findById(userId)

//     user.plan.push(newPlanSaved)
//     await user.save()
//   } catch (err) {
//     console.log(err)
//   }
// }
// export const deletePlan = async (req, res) => {
//   const planId = { _id: req.params.id }
//   try {
//     const memberPlan = await MemberPlan.findbyId(planId)
//   } catch (err) {
//     console.log(err)
//   }
// }


export default { updateUserPlanEndDate, getAllMemberPlans };
