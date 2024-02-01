import express from "express";
import {
  getLeaderboard,
  getLeaderboardNum,
} from "../controllers/leaderboard.js";
const router = express.Router();

router.get("/", getLeaderboard);
router.get("/:num", getLeaderboardNum);

export default router;
