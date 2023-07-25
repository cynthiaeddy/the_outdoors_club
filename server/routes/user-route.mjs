import express from 'express'
import { body } from 'express-validator'
import { checkAuth } from '../middleware/checkAuth.mjs'

const userRouter = express.Router()

import userController from '../controllers/user-controller.mjs'

// userRouter.post(
//   '/signup',
//   body('email').isEmail().withMessage('email is invalid'),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('length is six or more characters'),
//   userController.signup
// )

// userRouter.post('/login', userController.login)

// userRouter.get('/me', checkAuth, userController.checkUserAuth)

// userRouter.get('/', userController.getAllUsers)

// userRouter.get('/:id', userController.getSingleUser)

// userRouter.patch('/:id', userController.updateUser)

// userRouter.delete('/:id/', userController.deleteUser)

// userRouter.patch('/updateEndDate/:id', userController.updateUserEndDate)

export default userRouter
