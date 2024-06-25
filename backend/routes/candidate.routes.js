import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addCandidate, getCandidateInfo } from "../controllers/candidate.controller.js";
const router = express.Router();

router.get("/:canId",protectRoute, getCandidateInfo);
router.post("/add/:votingId",protectRoute, addCandidate); // id của người nhận

export default router;