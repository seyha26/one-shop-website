import mongoose from "mongoose";
const handler = async (req, res) => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log(db);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
