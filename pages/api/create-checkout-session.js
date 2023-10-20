import Stripe from "stripe";
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
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
        success_url: "/",
        cancel_url: "/",
      });
      // console.log("session.url: ", session);
      // console.log(data);
      res.json({ url: session.url });
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;
