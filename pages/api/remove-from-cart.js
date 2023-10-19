import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export default async function handler(req, res) {
  connectToMongoDB().catch((error) => console.log(error));
  try {
    const { userId, productId } = req.body;
    const user = await User.findOne({ _id: userId })
      .populate("cart.items.productId")
      .exec()
      .then((cart) => {
        return cart;
      });
    const productIndex = user.cart.items.findIndex((item) => {
      return item._id == productId;
    });
    // user.cart.items.filter((item) => {
    //   console.log(item.productId);
    //   return item.productId != productId;
    // });
    // console.log(productId, userId);
    // console.log(productIndex);
    if (productIndex >= 0) {
      user.cart.totalPrice -= user.cart.items[productIndex].productTotalPrice;
      user.cart.totalItems -= user.cart.items[productIndex].qty;
      user.cart.items.splice(productIndex, 1);
    }

    if (user.cart.items.length === 0) {
      user.cart.totalPrice = 0;
      user.cart.totalItems = 0;
    }
    // const cart = await User.findById(userId)
    //   .populate("cart.items.productId")
    //   .exec()
    //   .then((cart) => {
    //     // console.log(user);
    //     return cart;
    //   })
    //   .catch((err) => console.log(err));

    // return res.json(cart);
    user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
}
