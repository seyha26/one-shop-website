const Stripe = require("stripe");

const stripe = Stripe(
  "sk_test_51NwzytFwyHkLXoqGdas2SjCCNQgQmgm067NKJGxAXq5XRAg1P16eWQUvl4OQPIfp5zzSOEgTis1XxY3fF1kDfpF0003EGkfqdq"
);
const products = (async () => {
  const data = await fetch("https://dummyjson.com/products?limit=100").then(
    (res) => res.json()
  );
  return data.products;
})();

const allProducts = (async () => {
  return await products;
})();

console.log(allProducts);
