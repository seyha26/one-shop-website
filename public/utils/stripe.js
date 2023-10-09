const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51NwzytFwyHkLXoqGdas2SjCCNQgQmgm067NKJGxAXq5XRAg1P16eWQUvl4OQPIfp5zzSOEgTis1XxY3fF1kDfpF0003EGkfqdq"
);

const products = (async () => {
  const product = await stripe.products.list({
    limit: 3,
  });
  console.log(product);
})();

console.log(products);
