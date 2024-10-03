import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../config';

const Wishlist = () => {
	const [wishlist, setWishlist] = useState([]);

	const token = localStorage.getItem('token');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const response = await axios.get(
					`${API}/wishlist`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = response.data;
				setWishlist(data.productsInWishlist);
			} catch (error) {
				console.log(error);
			}
		};
		fetchWishlist();
	}, [token]);

	return (
		<>
			<div className='mx-auto max-w-7xl px-2'>
				<h1 className='text-3xl mt-9 mb-6'>Wishlist</h1>
				{/* wishlist */}
				<div className='grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3'>
					{wishlist?.length === 0 ? (
						<div className=''>
							No products in wishlist
						</div>
					) : (
						wishlist?.map((product, index) => (
							<div key={index} className='border'>
								<Link to={`/product/${product._id}`}>
									<img
										src={product.imageUrl}
										className='w-full h-96 rounded-md'
										alt={product.title}
									/>
								</Link>
								<div className='min-h-min p-3'>
									<Link to={`/product/${product._id}`}>
										<p className='mt-4 flex-1 text-base font-semibold text-gray-900 underline'>
											{product.title}
										</p>
									</Link>
									<p className='text-md mt-4 font-semibold leading-tight text-gray-900'>
										₹{product.price}
									</p>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</>
	);
};

export default Wishlist;
