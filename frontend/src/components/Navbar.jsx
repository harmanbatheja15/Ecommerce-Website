import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../config';

const Navbar = () => {
	const isAuthenticated = localStorage.getItem('isAuthenticated');
	const token = localStorage.getItem('token');
	const [user, setUser] = useState({});

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	isMobileMenuOpen
		? document.body.classList.add('overflow-hidden')
		: document.body.classList.remove('overflow-hidden');

	const navigate = useNavigate();

	const getUser = async () => {
		try {
			const response = await axios.get(`${API}/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = response.data;
			setUser(data.user);
		} catch (error) {
			console.log('Token not found');
		}
	};

	useEffect(() => {
		getUser();
	}, [token, isAuthenticated]);

	const handleLogout = () => {
		try {
			axios.post(
				`${API}/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			navigate('/');
			// Remove isAuthenticated and token from localStorage
			localStorage.removeItem('isAuthenticated');
			localStorage.removeItem('token');
			setIsMobileMenuOpen(false);
		} catch (error) {
			console.log('Logout failed!');
		}
	};

	return (
		<>
			<header className='relative w-full border-b bg-white pb-4'>
				<div className='mx-auto max-w-7xl flex items-center justify-between px-4 py-2'>
					<div className='inline-flex items-center space-x-2'>
						<span className='font-bold'>
							<Link
								to='/'
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Ecommerce
							</Link>
						</span>
					</div>
					<div className='hidden lg:block'>
						<ul className='inline-flex space-x-8'>
							<li>
								<Link
									to='/'
									className='text-sm font-semibold text-gray-800 hover:text-gray-900'
								>
									Home
								</Link>
							</li>
							{isAuthenticated ? (
								<>
									{user?.admin && (
										<li>
											<Link
												to='/addNewProduct'
												className='text-sm font-semibold text-gray-800 hover:text-gray-900'
											>
												Add Product
											</Link>
										</li>
									)}
									<li>
										<Link
											onClick={handleLogout}
											className='text-sm font-semibold text-gray-800 hover:text-gray-900'
										>
											Logout
										</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<Link
											to='/signup'
											className='text-sm font-semibold text-gray-800 hover:text-gray-900'
										>
											Signup
										</Link>
									</li>
									<li>
										<Link
											to='/signin'
											className='text-sm font-semibold text-gray-800 hover:text-gray-900'
										>
											Signin
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
					<div className='hidden lg:block'>
						{isAuthenticated && (
							<span className='text-sm font-semibold text-gray-800 hover:text-gray-900 border p-2 mr-3'>
								Welcome, {user?.name}
							</span>
						)}
						<Link to='/wishlist'>
							<span className='text-sm font-semibold text-gray-800 hover:text-gray-900 mr-5 ml-2'>
								Wishlist
							</span>
						</Link>
						<Link to='/cart'>
							<button
								type='button'
								className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
							>
								Cart
							</button>
						</Link>
					</div>
					<div
						className='lg:hidden'
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						<svg
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M2 8H14M2 4H14M6 12H14'
								stroke='black'
								strokeWidth='1.33333'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>
				</div>
			</header>
			{isMobileMenuOpen && (
				<div className='lg:hidden absolute bg-white z-[100] h-full w-full'>
					<ul className='flex flex-col space-y-4 items-center'>
						<li>
							<Link
								to='/'
								className='text-sm font-semibold text-gray-800 hover:text-gray-900'
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to='/wishlist'
								className='text-sm font-semibold text-gray-800 hover:text-gray-900'
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Wishlist
							</Link>
						</li>
						<li>
							<Link
								to='/cart'
								onClick={() => setIsMobileMenuOpen(false)}
							>
								<button
									type='button'
									className='rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
								>
									Cart
								</button>
							</Link>
						</li>
						{isAuthenticated ? (
							<>
								{user?.admin && (
									<li>
										<Link
											to='/addNewProduct'
											className='text-sm font-semibold text-gray-800 hover:text-gray-900'
											onClick={() =>
												setIsMobileMenuOpen(false)
											}
										>
											Add Product
										</Link>
									</li>
								)}
								<li>
									<Link
										onClick={handleLogout}
										className='text-sm font-semibold text-gray-800 hover:text-gray-900'
									>
										Logout
									</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link
										to='/signup'
										className='text-sm font-semibold text-gray-800 hover:text-gray-900'
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										Signup
									</Link>
								</li>
								<li>
									<Link
										to='/signin'
										className='text-sm font-semibold text-gray-800 hover:text-gray-900'
										onClick={() =>
											setIsMobileMenuOpen(false)
										}
									>
										Signin
									</Link>
								</li>
							</>
						)}
						{isAuthenticated && (
							<li>
								<span className='text-sm font-semibold text-gray-800 hover:text-gray-900 border p-2 mr-3'>
									Welcome, {user?.name}
								</span>
							</li>
						)}
					</ul>
				</div>
			)}
		</>
	);
};

export default Navbar;
