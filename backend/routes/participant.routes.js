import express from "express";
import { addParticipant, addParticipantWithPassword, checkUserJoinVoting, getAllParticipants, getVotingsByUser } from "../controllers/participant.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/checkUser/:votingId",protectRoute, checkUserJoinVoting); // ok
router.post("/addParticipant/:votingId",protectRoute, addParticipant); // ok
router.post("/addUserWithPassword/:votingId",protectRoute, addParticipantWithPassword); 
router.get("/getAllParticipants/:votingId",protectRoute, getAllParticipants);
router.get("/getVotingByUser/:votingId",protectRoute, getVotingsByUser);


export default router;
