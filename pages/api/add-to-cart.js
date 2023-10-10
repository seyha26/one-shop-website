import { connectToMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import User from "@/models/user";
export default async function handler(req, res) {
  connectToMongoDB().catch((error) => res.status(500).json({ error: error }));

  try {
    if (req.method === "POST") {
      const { productId, qty, userId, price } = req.body;

      // console.log(req.body);
      const user = await User.findOne({ _id: userId });

      const cartItemIndex = user.cart.items.findIndex(
        (item) => item.productId == productId
      );

      // console.log(cartItemIndex);
      if (cartItemIndex !== -1) {
        user.cart.items[cartItemIndex].qty += qty;
      } else {
        user.cart.items.push({ productId: productId, qty: qty });
      }

      // await User.findOne({ _id: userId })
      //   .then((result) => {
      //     result.cart.items.push({ productId: productId, qty: qty });
      //     result.cart.qty = qty;
      //     result.cart.totalPrice = price;
      user.save();
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
}
