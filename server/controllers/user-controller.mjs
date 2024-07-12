import Stripe from 'stripe'
import User from '../models/user.mjs'
import MemberPlan from '../models/memberPlan.mjs'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})

export const signup = async (req, res) => {

  const {
    firstName,
    lastName,
    email,
    password,
    role,
    address,
    city,
    state,
    zipcode,
    phoneNo,
    plan,
    newsletter,
    volunteer,
    agreeToTerms,
    notes,
  } = req.body

  const user = await User.findOne({ email })
  if (user) return res.status(400).send("User already registered.")


  const hashedPassword = await bcrypt.hash(password, 10)

  const customer = await stripe.customers.create({ email })

  console.log('stripe customer created on sign up,', customer)

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    address,
    city,
    state,
    zipcode,
    phoneNo,
    plan,
    newsletter,
    volunteer,
    agreeToTerms,
    notes,
    stripe_customer_id: customer.id
  })

  const token = JWT.sign(
    { email: newUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
      // expiresIn: 3600,

      // 1/2 hour
    }
  )

  try {
  } catch (err) {
    console.log(err)
  }

  res.json({
    errors: [],
    data: {
      token,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        address: newUser.address,
        city: newUser.city,
        state: newUser.state,
        zipcode: newUser.zipcode,
        phoneNo: newUser.phoneNo,
        plan: newUser.plan,
        newsletter: newUser.newsletter,
        volunteer: newUser.volunteer,
        agreeToTerms: newUser.agreeToTerms,
        notes: newUser.notes,
      },
    },
  })
}

export const login = async (req, res)=> {
  const { email, password } = req.body
  const user = await User.findOne({ email }).populate('plan')


  if (!user) {
    return res.json({
      errors: [
        {
          msg: 'Invalid credentials',
        },
      ],
      data: null,
    })
  }
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: 'Incorrect password',
        },
      ],
      data: null,
    })
  }
  const token = JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
    }
  )


  res.json({
    errors: [],
    data: {
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
        email: user.email,
        role: user.role,
        plan: user.plan,
        address: user.address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        phoneNo: user.phoneNo,
        newsletter: user.newsletter,
        volunteer: user.volunteer,
        agreeToTerms: user.agreeToTerms,
      },
    },
  })
}

export const checkUserAuth = async (req, res) => {
  // res.send(req.user)
  const user = await User.findOne({ email: req.user })
  return res.json({
    errors: [],
    data: {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
        email: user.email,
        role: user.role,
        plan: user.plan,
        address: user.address,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
        phoneNo: user.phoneNo,
        newsletter: user.newsletter,
        volunteer: user.volunteer,
        agreeToTerms: user.agreeToTerms,
      },
    },
  })
}
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('plan')

    res.send(users)
  } catch (err) {
    console.log(err)
  }
}

export const getSingleUser = async (req, res) => {
  const userId = req.params.id
  try {
    const user = await User.findById(userId).populate('plan')
    res.send(user)
  } catch (err) {
    console.log(err)
  }
}

export const updateUser = async (req, res) => {
  const filter = { _id: req.params.id }

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    address,
    city,
    state,
    zipcode,
    phoneNo,
    newsletter,
    volunteer,
    notes,
    role
  } = req.body
  try {
    if (password) {
      //password is not empty
      if (password !== confirmPassword) {
        return res.json({
          errors: [
            {
              msg: 'passwords do not match',
            },
          ],
          data: null,
        })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const fieldsToUpdate = {
        firstName,
        lastName,
        password: hashedPassword,
        email,
        phoneNo,
        role,
        address,
        city,
        state,
        zipcode,
        newsletter,
        volunteer,
        notes,
      }
      let existingUser = await User.findOneAndUpdate(filter, fieldsToUpdate, {
        new: true,
      })

      if (existingUser) {
        const token = JWT.sign(
          { email: existingUser.email },
          process.env.JWT_SECRET,
          {
            expiresIn: 3600,
          }
        )
        res.status(200).json({
          errors: [],
          data: {
            token,
            user: {
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
              id: existingUser._id,
              email: existingUser.email,
              role: existingUser.role,
              address: existingUser.address,
              city: existingUser.city,
              state: existingUser.state,
              zipcode: existingUser.zipcode,
              phoneNo: existingUser.phoneNo,
              plan: existingUser.plan,
              newsletter: existingUser.newsletter,
              volunteer: existingUser.volunteer,
              agreeToTerms: existingUser.agreeToTerms,
              notes: existingUser.notes,
            },
          },
        })
      } else {
        return res.json({
          errors: [
            {
              msg: 'user cannot be found, please try again',
            },
          ],
          data: null,
        })
      }
    } else {
      const fieldsToUpdate = {
        firstName,
        lastName,
        email,
        phoneNo,
        role,
        address,
        city,
        state,
        zipcode,
        newsletter,
        volunteer,
        notes,
      }
      let existingUser = await User.findOneAndUpdate(filter, fieldsToUpdate, {
        new: true,
      })
      if (existingUser) {
        const token = JWT.sign(
          { email: existingUser.email },
          process.env.JWT_SECRET,
          {
            expiresIn: 3600,
          }
        )
        res.status(200).json({
          errors: [],
          data: {
            token,
            user: {
              firstName: existingUser.firstName,
              lastName: existingUser.lastName,
              id: existingUser._id,
              email: existingUser.email,
              role: existingUser.role,
              address: existingUser.address,
              city: existingUser.city,
              state: existingUser.state,
              zipcode: existingUser.zipcode,
              phoneNo: existingUser.phoneNo,
              plan: existingUser.plan,
              newsletter: existingUser.newsletter,
              volunteer: existingUser.volunteer,
              agreeToTerms: existingUser.agreeToTerms,
              notes: existingUser.notes,
            },
          },
        })
      } else {
        res.status(400).json({ error: 'Error in update user' })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (req, res) => {
  const userId = { _id: req.params.id }

  try {
    const user = await User.findById(userId)
    const planId = user.plan[0]?._id
    await User.updateOne(
      { _id: userId },
      { $pull: { plan: { _id: planId } } }
    )
    await User.findByIdAndDelete(userId)

    await MemberPlan.findByIdAndDelete(planId)

    res.json({ msg: 'user and plan deleted' })
  } catch (error) {
    res.status(500).json({ err: error.message || 'error while deleting user' })
  }
}
export default { deleteUser, getAllUsers, signup, login, checkUserAuth, getSingleUser, updateUser };
