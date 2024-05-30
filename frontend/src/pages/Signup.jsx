import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
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
			.post(`${url}/signup`, {
				name,
				email,
				password,
			})
			.then((res) => {
				alert("Signup successful! Signin to continue!");
				navigate("/signin");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<section>
				<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
					<div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
						<h2 className="text-center text-2xl font-bold leading-tight text-black">
							Sign up to create account
						</h2>
						<p className="mt-2 text-center text-base text-gray-600">
							Already have an account?{" "}
							<Link
								to="/signin"
								title=""
								className="font-medium text-black transition-all duration-200 hover:underline"
							>
								Sign In
							</Link>
						</p>
						<form
							method="POST"
							className="mt-8 p-10 rounded-lg shadow-xl"
						>
							<div className="space-y-5">
								<div>
									<label
										htmlFor="name"
										className="text-base font-medium text-gray-900"
									>
										Full Name
									</label>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="text"
											placeholder="Full Name"
											id="name"
											required
											ref={myInputRef}
											onChange={(e) => {
												setName(e.target.value);
											}}
											value={name}
										></input>
									</div>
								</div>
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
										Create Account
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

export default Signup;
