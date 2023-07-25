import express from 'express'

const memberPlanRouter = express.Router()

import memberPlanController from'../controllers/plan-controller.mjs'

memberPlanRouter.patch('/date/:id', memberPlanController.updateUserPlanEndDate)

memberPlanRouter.patch('/:id', memberPlanController.updateUser)

memberPlanRouter.get('/:id', memberPlanController.getMemberPlan)

memberPlanRouter.get('/', memberPlanController.getAllMemberPlans)

memberPlanRouter.post('/add', memberPlanController.addNewPlan)

memberPlanRouter.delete('/:id', memberPlanController.deletePlan)

export default memberPlanRouter
