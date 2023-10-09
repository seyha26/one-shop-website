import Stripe from "stripe";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const stripe = Stripe(
  "sk_test_51Nx3uIFnnFfwB2hMo2RkwgNwYXKh242ir63F5ALHbZtyD5w7e64hPx8MEEoup6JftUPzFVk8TeYGj9P1CdBDuePG00p1C57BZF"
);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const data = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: data.map((item, i) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.amount,
          // images: [item.image, item.image],
        };
      }),
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/cart",
    });
    // console.log(session.url);
    // console.log(data);
    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000);
