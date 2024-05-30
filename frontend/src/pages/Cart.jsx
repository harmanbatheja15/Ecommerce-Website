import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
	const [cart, setCart] = useState([]);
	const [amount, setAmount] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);

	const isAuthenticated = localStorage.getItem("isAuthenticated");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	const DEV = false;
	const url = !DEV || DEV === undefined || DEV === null ?  "https://ecommerce-website-harman.vercel.app" : "http://localhost:3000";

	useEffect(() => {
		axios
			.get(`${url}/cart`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				const data = response.data;
				setCart(data.productsInCart);
			});
	}, []);

	useEffect(() => {
		let accumulatedAmount = 0;
		for (let i = 0; i < cart.length; i++) {
			accumulatedAmount += cart[i].price;
		}
		let deliveryFee =
			accumulatedAmount > 0 && accumulatedAmount < 2000 ? 100 : 0;
		setAmount(accumulatedAmount);
		setTotalAmount(accumulatedAmount + deliveryFee);
	}, [cart, token]);

	return (
		<>
			{isAuthenticated ? (
				<div className="mx-auto max-w-7xl px-2 lg:px-0">
					<div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
						<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Shopping Cart
						</h1>
						<form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
							<section
								aria-labelledby="cart-heading"
								className="rounded-lg bg-white lg:col-span-8"
							>
								<h2 id="cart-heading" className="sr-only">
									Items in your shopping cart
								</h2>
								<ul
									role="list"
									className="divide-y divide-gray-200"
								>
									{cart.map((product, index) => (
										<div key={index} className="">
											<li className="flex py-6 sm:py-6 ">
												<div className="flex-shrink-0">
													<img
														src={product.imageUrl}
														alt={product.title}
														className="sm:h-38 sm:w-38 w-40 rounded-md object-contain object-center"
													/>
												</div>

												<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
													<div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
														<div>
															<div className="flex justify-between">
																<h3 className="text-sm">
																	<Link
																		to={`/product/${product._id}`}
																		className="font-semibold text-black"
																	>
																		{
																			product.title
																		}
																	</Link>
																</h3>
															</div>
															<div className="mt-1 flex text-sm">
																<p className="text-sm text-gray-500">
																	{product.quantity ||
																		"quantity: 2"}
																</p>
																<p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
																	{product.size ||
																		"Size: 8 UK"}
																</p>
															</div>
															<div className="mt-1 flex items-end">
																<p className="text-sm font-medium text-gray-900">
																	₹
																	{
																		product.price
																	}
																</p>
															</div>
														</div>
													</div>
												</div>
											</li>
											<div className="mb-2 flex">
												<div className="min-w-24 flex">
													<button
														type="button"
														className="h-7 w-7"
													>
														-
													</button>
													<input
														type="text"
														className="mx-1 h-7 w-9 rounded-md border text-center"
														defaultValue={1}
													/>
													<button
														type="button"
														className="flex h-7 w-7 items-center justify-center"
													>
														+
													</button>
												</div>
												<div className="ml-6 flex text-sm">
													<Link
														onClick={async (e) => {
															e.preventDefault();
															try {
																const response =
																	await axios.put(
																		`${url}/cart/remove/${product._id}`,
																		{
																			productId:
																				product._id,
																		},
																		{
																			headers:
																				{
																					Authorization: `Bearer ${token}`,
																				},
																		}
																	);
																window.location.reload();
															} catch (error) {
																console.log(
																	"Error removing product from cart",
																	error
																);
															}
														}}
													>
														<button className="rounded-md bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
															Remove from cart
														</button>
													</Link>
												</div>
											</div>
										</div>
									))}
								</ul>
							</section>
							{/* Order summary */}
							<section
								aria-labelledby="summary-heading"
								className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
							>
								<h2
									id="summary-heading"
									className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
								>
									Price Details
								</h2>
								<div>
									<dl className="space-y-1 px-2 py-4">
										<div className="flex items-center justify-between">
											<dt className="text-sm text-gray-800">
												Price ({cart.length} item)
											</dt>
											<dd className="text-sm font-medium text-gray-900">
												₹{amount}
											</dd>
										</div>

										<div className="flex items-center justify-between py-4">
											<dt className="flex text-sm text-gray-800">
												<span>Delivery Charges</span>
											</dt>
											<dd className="text-sm font-medium text-green-700">
												{amount >= 2000
													? "Free"
													: amount > 0
													? "₹100"
													: "0"}
											</dd>
										</div>
										<div className="flex items-center justify-between border-y border-dashed py-4 ">
											<dt className="text-base font-medium text-gray-900">
												Total Amount
											</dt>
											<dd className="text-base font-medium text-gray-900">
												{totalAmount}
											</dd>
										</div>
									</dl>
									{amount <= 2000 ? (
										<div className="px-2 pb-4 font-medium text-red-700">
											Free delivery on orders above ₹2000
										</div>
									) : (
										<div className="px-2 pb-4 font-medium text-green-700">
											You will save ₹100 on this order
										</div>
									)}
								</div>
							</section>
						</form>
					</div>
				</div>
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
