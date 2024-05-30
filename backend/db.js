const mongoose = require('mongoose');

require('dotenv').config();

const db_connection = process.env.DB_CONNECTION;

mongoose
	.connect(db_connection)
	.then(() => {
		console.log('Database connected successfully');
	})
	.catch((err) => {
		console.error('Database connection error', err);
	});

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxLength: 100,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		minLength: 3,
		maxLength: 30,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	cart: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
	wishlist: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
	admin: {
		type: Boolean,
		default: false,
	},
});

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxLength: 80,
	},
	description: {
		type: String,
		required: true,
		maxLength: 400,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	imageUrl: {
		type: String,
		required: false,
	},
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product };
