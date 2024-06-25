import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectAdminRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		
		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, "ok");

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        if (user.role != "admin") {
			return res.status(404).json({ error: "User not admin" });
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectAdminRoute;
