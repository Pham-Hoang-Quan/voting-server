import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import votingRoutes from "./routes/voting.routes.js";
import candidateRouters from "./routes/candidate.routes.js";
import participantRoutes from "./routes/participant.routes.js";
import smartcontractRoutes from "./routes/smartcontract.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import cors from "cors";
// app.use(cors());
const whitelist = ['http://localhost:3000', 'https://voting-ui-eight.vercel.app'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
	// origin: function (origin, callback) {
    //     callback(null, true); // Cho phép tất cả các nguồn truy cập
    // },
    credentials: true // Cho phép gửi cookie từ client
};
app.use(cors(corsOptions));

// cấu hình tham số môi trường
dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5500;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

/// khởi tạo các route gồm có địa chỉ route và hàm thực hiện khi gọi tới route đó
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/votings", votingRoutes);
app.use("/api/candidates", candidateRouters);
app.use("/api/participants", participantRoutes);
app.use("/api/smartcontract", smartcontractRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
