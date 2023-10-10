import { connectToMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";
export default async function handler(req, res) {
  connectToMongoDB().catch((err) => res.status(500).json({ error: err }));
  try {
    if (req.method === "POST") {
      const { name, imageUrl, price, stock, category, description, rating } =
        req.body;
      await Product.create({
        name,
        imageUrl,
        price,
        stock,
        category,
        description,
        rating,
      })
        .then((result) => res.status(200).json(result))
        .catch((error) => console.log(error));
    }
  } catch (error) {}
}
