import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId)
      .populate("favorite.items.productId")
      .exec()
      .then((result) => {
        return result;
      });

    const productExisting = user.favorite.items.findIndex((item) => {
      return item.productId._id == productId;
    });
    if (productExisting === -1) {
      user.favorite.items.push({ productId, userId });
    }
    console.log(productExisting);
    console.log(user.favorite.items);
    user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
}
