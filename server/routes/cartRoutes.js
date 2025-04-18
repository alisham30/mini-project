const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require("../middleware/authMiddleware");

router.post("/add", auth, cartController.addToCart);
router.post("/remove", auth, cartController.removeFromCart);
router.get("/", auth, cartController.getCart);

module.exports = router;