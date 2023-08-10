// import { validationResult } from 'express-validator'

// module.exports = (req, res, next) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     let error = {}
//     // type EmptyObject = Record<any, never>
//     errors.array().map(err => (error[err.param] = err.msg))
//     return res.status(422).json({ error })
//   }

//   next()
// }
