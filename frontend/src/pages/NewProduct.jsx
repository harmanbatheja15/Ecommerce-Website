import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	return (
		<>
			<h1>Add New Product</h1>
		</>
	);
};

export default NewProduct;
