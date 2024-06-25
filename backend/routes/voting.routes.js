import express from "express";
import { createVoting, getVotingInfo, getAllCandidates, checkPassword, getVotings, getPrivateVotings, getPublicVotings, updateVoting, getVotingsByOwner } from "../controllers/voting.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import protectAdminRoute from "../middleware/protectAdminRoute.js";
const router = express.Router();

router.get("/:id",protectRoute, getVotingInfo);
router.post("/create",protectRoute, createVoting);
router.get("/getAllCandiddates/:id",protectRoute, getAllCandidates);
router.post("/check-password",protectRoute, checkPassword);
router.get("/getVotings/all",protectAdminRoute, getVotings);
router.get("/getVotings/private",protectRoute, getPrivateVotings);
router.get("/getVotings/public", protectRoute , getPublicVotings);
router.put('/updateVoting/:id',protectRoute, updateVoting);
router.get('/getYourVotings/:owner',protectRoute, getVotingsByOwner);
export default router;