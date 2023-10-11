import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    const { userId, productId } = req.body;
    const user = await User.findOne({ _id: userId });
    const productIndex = user.cart.items.findIndex((item) => {
      return item._id == productId;
    });
    // user.cart.items.filter((item) => {
    //   console.log(item.productId);
    //   return item.productId != productId;
    // });
    console.log(productId, userId);
    // console.log(productIndex);
    if (productIndex >= 0) {
      user.cart.items.splice(productIndex, 1);
    }
    user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
}
