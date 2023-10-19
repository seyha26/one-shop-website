import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    const { userId } = req.query;
    const user = await User.findById(userId)
      .populate("favorite.items.productId")
      .populate("cart.items.productId")
      .exec()
      .then((result) => {
        return result;
      });
    console.log(user.cart.items);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
}
