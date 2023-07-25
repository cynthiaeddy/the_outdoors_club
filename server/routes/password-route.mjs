import express from 'express'
const passwordRouter = express.Router()

import passwordController from '../controllers/password-controller.mjs'

passwordRouter.post('/forgot-password', passwordController.forgotPassword)
passwordRouter.get('/reset', passwordController.resetPassword)

passwordRouter.put('/updatePasswordViaEmail', passwordController.updatePassword)

export default passwordRouter
