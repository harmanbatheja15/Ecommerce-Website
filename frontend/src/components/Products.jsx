import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API } from '../../config';

const Products = () => {
	const [products, setProducts] = useState([]);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${API}/products`)
			.then((response) => {
				const data = response.data;
				setProducts(data.products);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<div className="mx-auto max-w-7xl px-2">
				<h1 className="text-3xl mt-9 mb-6">Products</h1>
				{/* products */}
				<div className="grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
					{products.map((product, index) => (
						<div key={index} className="border">
							<Link to={`/product/${product._id}`}>
								<img
									src={product.imageUrl}
									className="w-full h-96 rounded-md"
									alt={product.title}
								/>
							</Link>
							<div className="min-h-min p-3">
								<Link to={`/product/${product._id}`}>
									<p className="mt-4 flex-1 text-base font-semibold text-gray-900 underline">
										{product.title}
									</p>
								</Link>
								<p className="text-md mt-4 font-semibold leading-tight text-gray-900">
									₹{product.price}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Products;
