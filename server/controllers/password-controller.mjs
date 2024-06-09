import User from '../models/user.mjs'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'



export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    if (email === '') {
      res.status(400).send('email required')
    }
    const user = await User.findOne({
      email,
    })
    if (user === null) {
      res.status(403).send('email not in db')
    } else {
      const token = crypto.randomBytes(20).toString('hex')
      await user.updateOne({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      })

      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },

      })

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
          `${process.env.FRONTEND_URL}/reset/${token}\n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n\n'
        ,
      }
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err)
            reject(err);
          } else {
            console.log('here is the res: ', response)
            res.status(200).json('recovery email sent')
            resolve(response);
          }
        })
      })
    }
  } catch (err) {
    console.log(err)
  }
}



export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
    })
    if (user == null) {
      console.error('password reset link is invalid or has expired')
      res.status(403).send('password reset link is invalid or has expired')
    } else {
      res.status(200).send({
        email: user.email,
        message: 'password reset link a-ok',
      })
    }
  } catch (err) {
    console.log(err)
  }
}
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })

    if (user === null) {
      console.error('password reset link is invalid or has expired')
      res.status(403).send('password reset link is invalid or has expired')
    } else if (user !== null) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const fieldsToUpdate = {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      }
      await User.findOneAndUpdate({ email: req.body.email }, fieldsToUpdate, {
        new: true,
      })
      console.log('password updated')
      res.status(200).send({ message: 'password updated' })
    }
  } catch (err) {
    console.log(err)
  }
}

export default {forgotPassword,resetPassword,updatePassword}
