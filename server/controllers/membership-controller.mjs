
import Membership from '../models/membership.mjs'

export const getMemberships = async (req, res) => {
  console.log('in get memberships, controller')
  try {
    const memberships = await Membership.find()

    res.send(memberships)
  } catch (err) {}
}
export default { getMemberships };
