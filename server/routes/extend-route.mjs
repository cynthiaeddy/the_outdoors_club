import express from 'express'

const MemberExtendRouter = express.Router()

import MemberExtendController from '../controllers/extend-controller.mjs'

MemberExtendRouter.get('/', MemberExtendController.getMembershipExtends)

export default MemberExtendRouter
