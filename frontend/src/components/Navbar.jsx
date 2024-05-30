import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const isAuthenticated = localStorage.getItem("isAuthenticated");
	const token = localStorage.getItem("token");
	const [user, setUser] = useState({});

	const navigate = useNavigate();

	const DEV = false;
	const url = !DEV || DEV === undefined || DEV === null ?  "https://ecommerce-website-harman.vercel.app" : "http://localhost:3000";
	console.log('URL: ', url);

	const getUser = async () => {
		try {
			const response = await axios.get(`${url}/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = response.data;
			setUser(data.user);
		} catch (error) {
			console.log("Token not found");
		}
	};

	useEffect(() => {
		getUser();
	}, [token, isAuthenticated]);

	const handleLogout = () => {
		try {
			axios.post(
				`${url}/logout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Remove isAuthenticated and token from localStorage
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("token");
			navigate("/");
		} catch (error) {
			console.log("Logout failed!");
		}
	};

	return (
		<>
			<header className="relative w-full border-b bg-white pb-4">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
					<div className="inline-flex items-center space-x-2">
						<span className="font-bold">
							<Link to="/">Ecommerce</Link>
						</span>
					</div>
					<div className="hidden lg:block">
						<ul className="inline-flex space-x-8">
							<li>
								<Link
									to="/"
									className="text-sm font-semibold text-gray-800 hover:text-gray-900"
								>
									Home
								</Link>
							</li>
							{isAuthenticated ? (
								<>
									{user.admin && (
										<li>
											<Link
												to="/addNewProduct"
												className="text-sm font-semibold text-gray-800 hover:text-gray-900"
											>
												Add Product
											</Link>
										</li>
									)}
									<li>
										<Link
											onClick={handleLogout}
											className="text-sm font-semibold text-gray-800 hover:text-gray-900"
										>
											Logout
										</Link>
									</li>
								</>
							) : (
								<>
									<li>
										<Link
											to="/signup"
											className="text-sm font-semibold text-gray-800 hover:text-gray-900"
										>
											Signup
										</Link>
									</li>
									<li>
										<Link
											to="/signin"
											className="text-sm font-semibold text-gray-800 hover:text-gray-900"
										>
											Signin
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
					<div className="hidden lg:block">
						{isAuthenticated && (
							<span className="text-sm font-semibold text-gray-800 hover:text-gray-900 border p-2 mr-3">
								Welcome, {user.name}
							</span>
						)}
						<Link to="/cart">
							<button
								type="button"
								className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
							>
								Cart
							</button>
						</Link>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navbar;
