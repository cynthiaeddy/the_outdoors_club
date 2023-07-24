import MemberExtend from '../models/memberExtend.mjs'


export const getMembershipExtends = async (req, res) => {
  try {
    const memberships = await MemberExtend.find()

    res.send(memberships)
  } catch (err) {}
}


export default { getMembershipExtends };
