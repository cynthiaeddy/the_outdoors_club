import JWT from 'jsonwebtoken'

export const checkAuth = async (
  req,
  res,
  next
) => {
  let token = req.header('authorization')
  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    })
  }
  token = token.split(' ')[1]

  try {
    const user = JWT.verify(token, process.env.JWT_SECRET )
    req.user = user.email
    next()
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    })
  }
}

export const checkAdminAuth = async (
  req,
  res,
  next
) => {
  let token = req.header('authorization')
  if (token) {
    const user = JWT.verify(token, process.env.JWT_SECRET )
    req.user = user.email
  } else {
    return res
      .status(401)
      .json({ message: 'Not authorized, token not available' })
  }
}
export default {checkAuth, checkAdminAuth}
