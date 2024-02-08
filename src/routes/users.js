import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserTeamById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/u/:id", getUserById);
router.get("/t/:id", getUserTeamById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
