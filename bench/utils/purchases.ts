const purchases = Array.from({ length: 1000 }, (_, i) => ({
  name: `Item ${i + 1}`,
  price: i * 2,
  quantity: i * 5
}));

export default purchases;
