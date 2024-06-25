import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addUser, addVote, getAllVotes, getAllVotesFromContract, getVoteUpdates, getVoteUpdatesByIdVotingAndUser, getVotesByIdCandidate, getVotesByIdUser, getVotesByIdVoting, updateVote } from "../smartcontract/interact.js";
const router = express.Router();

router.get("/getAllVotes",protectRoute, getAllVotes);//ok 1
router.post("/addUser",protectRoute, addUser); //ok 2
router.post("/addVote",protectRoute, addVote); // postman, app 3
router.post("/updateVote",protectRoute, updateVote); // postman, app 4
router.get("/getVoteUpdatesByIdVotingAndUser/:_idVoting/:_idUser",protectRoute, getVoteUpdatesByIdVotingAndUser); // 5 postman, app
router.get("/getVotesByIdCandidate/:_idCandidate",protectRoute, getVotesByIdCandidate); // 6
router.get("/getVoteByIdUser/:_idUser",protectRoute, getVotesByIdUser); // 7 postman, app
router.get("/getVoteByIdVoting/:_idVoting",protectRoute, getVotesByIdVoting); // 8
router.get("/getVoteUpdates",protectRoute, getVoteUpdates); // 9
router.get("/getAllVotesFromContract",protectRoute, getAllVotesFromContract); // 10

export default router;