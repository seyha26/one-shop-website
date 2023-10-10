import Product from "@/models/products";
import { connectToMongoDB } from "@/lib/mongodb";
export default async function handler(req, res) {
  connectToMongoDB().catch((err) => res.status(500).json({ error: err }));
  try {
    const products = await Product.find();
    // console.log(getProduct);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
