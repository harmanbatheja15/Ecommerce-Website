import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Cart from "./pages/Cart";
import NewProduct from "./pages/NewProduct";
import ProductDetail from "./pages/ProductDetail";
import Wishlist from './pages/Wishlist';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/cart" element={<Cart />} />
					<Route path='/wishlist' element={<Wishlist />} />
					<Route path="/addNewProduct" element={<NewProduct />} />
					<Route path="/product/:id" element={<ProductDetail />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
