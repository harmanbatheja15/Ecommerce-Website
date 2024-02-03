const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userMiddleware = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: "Unauthorized access - Token missing",
		});
	}

	const words = token.split(" ");
	const jwtToken = words[1];

	try {
		const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

		if (decodedValue.email) {
			req.email = decodedValue.email;
			next();
		} else {
			res.status(403).json({
				message: "Unauthorized access - Invalid token",
			});
		}
	} catch (error) {
		console.error("JWT verification error:", error.message);
		res.status(500).json({
			message: "Internal server error",
		});
	}
};

module.exports = userMiddleware;
