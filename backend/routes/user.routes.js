import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getUserById, getUsers, updateUser, getBlockedUsers, getUnblockedUsers, blockUser, unblockUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",protectRoute, getUsersForSidebar);
router.get("/:id",protectRoute, getUserById);
router.get("/getUsers/user",protectRoute, getUsers);
router.post("/updateUser/:id",protectRoute, updateUser);
router.get("/getUsers/blocked",protectRoute, getBlockedUsers);
router.get("/getUsers/unblocked",protectRoute, getUnblockedUsers);
router.put("/blockUser/:id",protectRoute, blockUser);
router.put("/unblockUser/:id",protectRoute, unblockUser);

export default router;
