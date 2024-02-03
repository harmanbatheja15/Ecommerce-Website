const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const userMiddleware = require("../middleware/user");
const { Product, User } = require("../db");

const app = express();
app.use(express.json());

const router = express.Router();

// Home Route
router.get("/", async (req, res) => {
	const products = await Product.find();

	return res.status(200).json({
		products,
	});
});

// Signup Route
router.post("/signup", async (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;

	await User.create({ name, email, password });

	res.status(200).json({
		message: `Signup successful ${name}! Please signin.`,
	});
});

// Signin Route
router.post("/signin", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({
		email,
		password,
	});

	if (user) {
		const token = jwt.sign(
			{
				email,
			},
			JWT_SECRET
		);
		res.status(200).json({
			message: `Signin successful!`,
			token: token,
		});
	} else {
		res.status(411).json({
			message: "Invalid credentials!",
		});
	}
});

// Create Product Route
router.post("/product/create", userMiddleware, async (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const price = req.body.price;
	const imageUrl = req.body.imageUrl;

	await Product.create({ title, description, price, imageUrl });

	return res.status(200).json({
		message: `Product added successfully!`,
	});
});

// Products Route
router.get("/products", async (req, res) => {
	const products = await Product.find();

	return res.status(200).json({
		products,
	});
});

// Product Detail Route
router.get("/product/:productId", async (req, res) => {
	const productId = req.params.productId;
	const product = await Product.find({
		_id: productId,
	});

	return res.status(200).json({
		product,
	});
});

// Products in Wishlist Route
router.get("/wishlist", userMiddleware, async (req, res) => {
	const user = await User.findOne({
		email: req.email,
	});
	const productsInWishlist = await Product.find({
		_id: {
			$in: user.wishlist,
		},
	});
	res.status(200).json({
		productsInWishlist,
	});
});

// Add Product to Wishlist Route
router.put("/wishlist/add/:productId", userMiddleware, async (req, res) => {
	const productId = req.params.productId;
	const email = req.email;

	await User.updateOne(
		{
			email,
		},
		{
			$push: {
				wishlist: productId,
			},
		}
	);

	res.status(200).json({
		message: "Product added to wishlist!",
	});
});

// Remove product from wishlist Route
router.put("/wishlist/remove/:productId", userMiddleware, async (req, res) => {
	const productId = req.params.productId;
	const email = req.email;

	await User.updateOne(
		{
			email,
		},
		{
			$pull: {
				wishlist: productId,
			},
		}
	);

	res.status(200).json({
		message: "Product removed from wishlist!",
	});
});

// Add Product to Cart Route
router.put("/cart/add/:productId", userMiddleware, async (req, res) => {
	const productId = req.params.productId;
	const email = req.email;

	await User.updateOne(
		{
			email,
		},
		{
			$push: {
				cart: productId,
			},
		}
	);

	res.status(200).json({
		message: "Product added to cart!",
	});
});

// Remove product from cart Route
router.put("/cart/remove/:productId", userMiddleware, async (req, res) => {
	const productId = req.params.productId;
	const email = req.email;

	await User.updateOne(
		{
			email,
		},
		{
			$pull: {
				cart: productId,
			},
		}
	);

	res.status(200).json({
		message: "Product removed from cart!",
	});
});

// Products in Cart Route
router.get("/cart", userMiddleware, async (req, res) => {
	const user = await User.findOne({
		email: req.email,
	});
	const productsInCart = await Product.find({
		_id: {
			$in: user.cart,
		},
	});
	res.status(200).json({
		productsInCart,
	});
});

// Logout Route
router.post("/logout", userMiddleware, (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.decode(token);

	if (decodedToken) {
		invalidatedTokens.add(decodedToken.jti);
	}

	res.status(200).json({ message: "Logout successful" });
});

// Me Route
router.get("/me", userMiddleware, async (req, res) => {
	const user = await User.findOne({
		email: req.email,
	});

	res.status(200).json({
		user,
	});
});

module.exports = router;
