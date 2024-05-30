import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { CiHeart, CiShare2 } from "react-icons/ci";

const ProductDetailNew = () => {
	const [productData, setProductData] = useState({});
	const [cart, setCart] = useState([]);

	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const { id } = useParams();

	const DEV = false;
	const url = !DEV || DEV === undefined || DEV === null ?  "https://ecommerce-website-harman.vercel.app" : "http://localhost:3000";

	// Get Product
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(
					`${url}/product/${id}`
				);
				const data = response.data;
				setProductData(data.product[0]);
			} catch (error) {
				console.log(error);
			}
		};

		fetchProduct();
	}, [id]);

	// Get cart
	useEffect(() => {
		const fetchCart = async () => {
			try {
				const response = await axios.get(`${url}/cart`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = response.data;
				setCart(data.productsInCart);
			} catch (error) {
				console.log(error);
			}
		};

		fetchCart();
	}, [token]);

	const AddToCartBtn = () => {
		return (
			<button
				type="button"
				className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
				onClick={async (e) => {
					e.preventDefault();
					try {
						await axios.put(
							`${url}/cart/add/${productData._id}`,
							{
								productId: productData._id,
							},
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
						navigate("/cart");
					} catch (error) {
						console.log("Error adding product to cart:", error);
					}
				}}
			>
				Add To Cart
			</button>
		);
	};

	const RemoveFromCartBtn = () => {
		return (
			<button
				type="button"
				className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red"
				onClick={async (e) => {
					e.preventDefault();
					try {
						await axios.put(
							`${url}/cart/remove/${productData._id}`,
							{
								productId: productData._id,
							},
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
						window.location.reload();
					} catch (error) {
						console.log(error);
					}
				}}
			>
				Remove From Cart
			</button>
		);
	};

	return (
		<>
			<div className="sp mx-auto max-w-7xl px-2 py-10 lg:px-0">
				<div className="overflow-hidden">
					<div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
						<div className="items-start justify-between lg:flex lg:space-x-8">
							<div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
								<div className="w-full xl:flex xl:flex-row-reverse">
									<div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[480px] 2xl:w-[650px]">
										<div className="relative flex items-center justify-center">
											<img
												alt="Product gallery 1"
												src={productData.imageUrl}
												width={650}
												height={590}
												className="rounded-lg object-cover md:w-[500px] lg:h-full"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="flex shrink-0 flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
								<div className="pb-5">
									<h2 className="text-lg font-semibold md:text-xl xl:text-2xl">
										{productData.title}
									</h2>
									<p className="mt-4 font-semibold">
										₹{productData.price}
									</p>
								</div>
								<div className="border-gray-100 pb-5">
									<div className="ml-auto flex items-center">
										<span className="mr-3 text-sm font-semibold">
											Size
										</span>
										<div className="relative">
											<select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black">
												<option>38</option>
												<option>40</option>
												<option>42</option>
												<option>44</option>
											</select>
											<span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
												<IoIosArrowDown size={16} />
											</span>
										</div>
									</div>
								</div>
								<div className="pb-2" />
								<div className="space-y-2.5 pt-1.5 md:space-y-3.5 lg:pt-3 xl:pt-4">
									{!cart.some((item) => item._id === id) ? (
										<AddToCartBtn />
									) : (
										<RemoveFromCartBtn />
									)}

									<div className="grid grid-cols-2 gap-2.5">
										<button
											type="button"
											className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
										>
											<CiHeart
												size={20}
												className="mr-3"
											/>
											<span className="block">
												Wishlist
											</span>
										</button>
										<div className="relative">
											<button
												type="button"
												className="inline-flex w-full items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
											>
												<CiShare2
													size={20}
													className="mr-3"
												/>
												<span className="block">
													Share
												</span>
											</button>
										</div>
									</div>
								</div>
								<div className="pt-6 xl:pt-8">
									<h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
										Product Details:
									</h3>
									<p className="text-sm">
										{productData.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProductDetailNew;
