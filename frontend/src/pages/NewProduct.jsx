import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const myInputRef = useRef(null);

	useEffect(() => {
		myInputRef.current.focus();
	}, []);

	const DEV = false;
	const url = !DEV || DEV === undefined || DEV === null ?  "https://ecommercewebsite-server.vercel.app" : "http://localhost:3000";

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				`${url}/product/create`,
				{
					title,
					description,
					price,
					imageUrl,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				alert("Product added successful!");
				navigate("/");
			})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<>
			<section>
				<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
					<div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
						<h2 className="text-center text-2xl font-bold leading-tight text-black">
							Add New Product
						</h2>
						<form
							method="POST"
							className="mt-8 p-10 rounded-lg shadow-xl"
						>
							<div className="space-y-5">
								<div>
									<label
										htmlFor="title"
										className="text-base font-medium text-gray-900"
									>
										Title
									</label>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="text"
											placeholder="Title"
											id="text"
											ref={myInputRef}
											onChange={(e) => {
												setTitle(e.target.value);
											}}
											value={title}
										></input>
									</div>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="description"
											className="text-base font-medium text-gray-900"
										>
											Description
										</label>
									</div>
									<div className="mt-2">
										<textarea
											className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="text"
											placeholder="Description"
											id="description"
											rows={5}
											onChange={(e) => {
												setDescription(e.target.value);
											}}
											value={description}
										></textarea>
									</div>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="price"
											className="text-base font-medium text-gray-900"
										>
											Price
										</label>
									</div>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="number"
											placeholder="Price"
											id="price"
											onChange={(e) => {
												setPrice(e.target.value);
											}}
											value={price}
										></input>
									</div>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="imageUrl"
											className="text-base font-medium text-gray-900"
										>
											Image URL
										</label>
									</div>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="text"
											placeholder="Image URL"
											id="imageUrl"
											onChange={(e) => {
												setImageUrl(e.target.value);
											}}
											value={imageUrl}
										></input>
									</div>
								</div>
								<div>
									<button
										onClick={handleSubmit}
										className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
									>
										Add
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default NewProduct;
