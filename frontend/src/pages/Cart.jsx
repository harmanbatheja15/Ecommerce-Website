import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
	const [cart, setCart] = useState([]);
	const [amount, setAmount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);

	return (
		<>
			{isAuthenticated ? (
				<h1>Cart</h1>
			) : (
				<div className="mx-auto max-w-7xl px-2 text-center">
					<h1 className="text-2xl mt-9 mb-6">
						Please{" "}
						<Link to="/signin" className="underline text-blue-800">
							Login
						</Link>
					</h1>
				</div>
			)}
		</>
	);
};

export default Cart;
