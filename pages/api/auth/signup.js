import { connectToMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import mongoose from "mongoose";

const handler = async (req, res) => {
  connectToMongoDB().catch((error) => res.json(error));
  // console.log("req", req.method);
  if (req.method === "POST") {
    if (!req.body) {
      return res.status(400).json({ error: "Data is missing" });
    }
    const { fullName, username, password } = req.body;
    const userExists = await User.findOne({ username });
    // console.log(userExists);

    if (userExists) {
      // console.log("first");
      return res.status(409).json({ error: "User already exists" });
    } else {
      // console.log("not exist user");
      if (password.length < 6) {
        // console.log("password");
        return res
          .status(409)
          .json({ error: "Password should be 6 character long" });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      // console.log(hashedPassword);

      User.create({
        fullName,
        username,
        password: hashedPassword,
      })
        .then((data) => {
          // console.log(data);
          // console.log("user");
          const user = {
            username: data.username,
            fullName: data.fullName,
            _id: data._id,
          };
          // console.log("hello");
          return res.status(201).json({
            success: true,
            data,
          });
        })
        .catch((error) => {
          console.error("error", error);
          if (error instanceof mongoose.Error) {
            for (let field in error.errors) {
              const msg = error.errors[field].message;
              return res.status(409).json({ error: msg });
            }
          } else {
            return res.status(500).json({ error: "Internal server error" });
          }
        });
    }
  } else {
    res.status(405).json({ error: "Method not Allowed" });
  }
};
export default handler;
