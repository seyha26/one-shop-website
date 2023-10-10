import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    const { userId } = req.query;
    const data = await User.findOne({ _id: userId })
      .populate("cart.items.productId")
      .exec()
      .then((user) => {
        // console.log(user);
        return user;
      })
      .catch((err) => console.log(err));
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
}
