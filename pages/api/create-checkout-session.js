import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51Nx3uIFnnFfwB2hMo2RkwgNwYXKh242ir63F5ALHbZtyD5w7e64hPx8MEEoup6JftUPzFVk8TeYGj9P1CdBDuePG00p1C57BZF"
);
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = req.body;
      // console.log("data", data);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: data.map((item, i) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.productId.name,
              },
              unit_amount: item.productId.price * 100,
            },
            quantity: item.qty,
            // images: [item.image, item.image],
          };
        }),
        success_url: "http://localhost:3000/",
        cancel_url: "http://localhost:3000/",
      });
      // console.log("session.url: ", session.url);
      // console.log(data);
      res.json({ url: session.url });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
