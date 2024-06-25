import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
	try {
		const { address, avtUrl, email, name, role, username, password } = req.body;

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}
		// HASH PASSWORD HERE
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			address,
			name,
			password: hashedPassword,
			avtUrl,
			email,
			role,
			userId: username,
		});

		if (newUser) {
			const userId = newUser._id
			const token = jwt.sign({ userId }, "ok", {
				expiresIn: "15d",
			});

			res.cookie("jwt", token, {
				maxAge: 15 * 24 * 60 * 60 * 1000, // MS
				httpOnly: true, // prevent XSS attacks cross-site scripting attacks
				sameSite: "strict", // CSRF attacks cross-site request forgery attacks
				secure: false, // do not
			});
			await newUser.save();

			res.status(201).json({
				token: token,
				newUser
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid email or password" });
		}
		const userId = user._id
		const token = jwt.sign({ userId }, "ok", {
			expiresIn: "15d",
		});

		res.cookie("jwt", token, {
			maxAge: 15 * 24 * 60 * 60 * 1000, // MS
			httpOnly: true, // prevent XSS attacks cross-site scripting attacks
			sameSite: "strict", // CSRF attacks cross-site request forgery attacks
			secure: false, // do not
		});

		res.status(200).json({
			token: token,
			user
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const changePassword = async (req, res) => {
	try {
		const { userId } = req.params; // Lấy userId từ URL params
		const { oldPassword, newPassword } = req.body;

		// Tìm user theo userId
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Kiểm tra oldPassword có đúng không
		const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Old password is incorrect" });
		}

		// Tạo hash cho mật khẩu mới
		const salt = await bcrypt.genSalt(10);
		const hashedNewPassword = await bcrypt.hash(newPassword, salt);

		// Cập nhật mật khẩu mới cho user
		user.password = hashedNewPassword;
		await user.save();

		res.status(200).json({ message: "Password changed successfully" });
	} catch (error) {
		console.log("Error in changePassword controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};