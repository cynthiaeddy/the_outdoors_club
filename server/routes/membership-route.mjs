import express from 'express'

const membershipRouter = express.Router()


import membershipController from '../controllers/membership-controller.mjs'

membershipRouter.get('/', membershipController.getMemberships)


export default membershipRouter
