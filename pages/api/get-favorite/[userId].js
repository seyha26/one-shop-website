import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    const { userId } = req.query;
    console.log(userId);
    const user = await User.findById(userId)
      .populate("favorite.items.productId")
      .exec()
      .then((result) => {
        return result;
      });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
}
