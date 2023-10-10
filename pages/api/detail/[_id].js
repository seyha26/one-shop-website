import { connectToMongoDB } from "@/lib/mongodb";
import Product from "@/models/products";

export default async function handler(req, res) {
  connectToMongoDB().catch((error) => res.status(500).json({ error: error }));
  try {
    if (req.method === "POST") {
      // console.log(req.params);
      // const { _id } = ;
      await Product.findOne({ _id: req.query._id })
        .then((result) => {
          // console.log(result);
          return res.status(200).json(result);
        })
        .catch((error) => console.log(error));
    }
  } catch (error) {
    console.log(error);
  }
}
