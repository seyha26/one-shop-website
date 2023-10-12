import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    console.log("User cart by userId");
    const { userId } = req.query;
    const user = await User.findById(userId)
      .populate("cart.items.productId")
      .exec()
      .then((user) => {
        // console.log(user);
        return user;
      })
      .catch((err) => console.log(err));

    return res.json(user);
  } catch (error) {
    console.log("user cart error: ", error);
  }
}
