import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();
	const myInputRef = useRef(null);

	useEffect(() => {
		myInputRef.current.focus();
	}, []);

	const DEV = false;
	const url = !DEV || DEV === undefined || DEV === null ?  "https://ecommercewebsite-server.vercel.app" : "http://localhost:3000";

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${url}/signin`, {
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem("token", res.data.token);
				localStorage.setItem("isAuthenticated", true);
				alert("Signin successful");
				navigate("/");
			})
			.catch((err) => {
				alert("Invalid Credentials");
			});
	};

	return (
		<>
			<section>
				<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
					<div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
						<h2 className="text-center text-2xl font-bold leading-tight text-black">
							Sign In
						</h2>
						<p className="mt-2 text-center text-base text-gray-600">
							Don't have an account'?{" "}
							<Link
								to="/signup"
								title=""
								className="font-medium text-black transition-all duration-200 hover:underline"
							>
								Sign Up
							</Link>
						</p>
						<form
							method="POST"
							className="mt-8 p-10 rounded-lg shadow-xl"
						>
							<div className="space-y-5">
								<div>
									<label
										htmlFor="email"
										className="text-base font-medium text-gray-900"
									>
										Email address
									</label>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="email"
											placeholder="Email"
											id="email"
											ref={myInputRef}
											onChange={(e) => {
												setEmail(e.target.value);
											}}
											value={email}
										></input>
									</div>
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor="password"
											className="text-base font-medium text-gray-900"
										>
											Password
										</label>
									</div>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="password"
											placeholder="Password"
											id="password"
											onChange={(e) => {
												setPassword(e.target.value);
											}}
											value={password}
										></input>
									</div>
								</div>
								<div>
									<button
										onClick={handleSubmit}
										className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
									>
										Signin
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

export default Signin;
