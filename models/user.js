import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require: [true, "Email is require"],
  },
  fullName: {
    type: String,
    require: [true, "Full name is required"],
    minLength: [4, "Full name should be at least 4 characters long"],
    maxLength: [30, "Full name should be less than 30"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select: false,
  },
  favorite: {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  cart: {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, required: true },
        productTotalPrice: { type: Number, require: true },
      },
    ],
    totalItems: Number,
    totalPrice: Number,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
