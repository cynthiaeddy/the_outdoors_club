
import Membership from '../models/membership.mjs'

export const getMemberships = async (req, res) => {
  // req.setTimeout(15000); // 15 seconds timeout for this route
  const waitTime = 15000;
        setTimeout(() => console.log("Request taking a long time, getMemberships"), waitTime);
  try {

    const memberships = await Membership.find()

    res.send(memberships)
  } catch (err) {}
}
export default { getMemberships }
