const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  const { products, total } = req.body;
  const order = new Order({ userId: req.user.id, products, total });
  await order.save();
  res.json({ message: "Order placed successfully!" });
};