import { connectToMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
import User from "@/models/user";
export default async function handler(req, res) {
  connectToMongoDB().catch((error) => res.status(500).json({ error: error }));

  try {
    if (req.method === "POST") {
      const { productId, qty, userId, price } = req.body;

      // console.log(req.body);
      const user = await User.findOne({ _id: userId })
        .populate("cart.items.productId")
        .populate("favorite.items.productId")
        .exec()
        .then((result) => {
          return result;
        });

      const cartItemIndex = user.cart.items.findIndex(
        (item) => item.productId._id == productId._id
      );

      const items = user.cart.items;
      // console.log(user.cart.totalItems);

      if (items.length === 0) {
        user.cart.totalPrice = 0;
        user.cart.totalItems = 0;
      }

      console.log(cartItemIndex);
      if (cartItemIndex !== -1) {
        user.cart.items[cartItemIndex].qty += qty;
        user.cart.items[cartItemIndex].productTotalPrice += price;
        // console.log(user.cart.totalPrice);
      } else {
        user.cart.items.push({
          productId: productId,
          qty: qty,
          productTotalPrice: qty * price,
        });

        // console.log(user.cart.totalPrice);
      }
      user.cart.totalPrice += price;
      user.cart.totalItems += qty;

      // await User.findOne({ _id: userId })
      //   .then((result) => {
      //     result.cart.items.push({ productId: productId, qty: qty });
      //     result.cart.qty = qty;
      //     result.cart.totalPrice = price;
      console.log(user.cart.items);
      user.save();
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
}
