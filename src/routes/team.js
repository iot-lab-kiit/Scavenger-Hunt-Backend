import express from "express";
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  updatePoints,
} from "../controllers/team.js";
const router = express.Router();

router.post("/", createTeam);
router.get("/", getAllTeams);
router.put("/t/:id", updateTeam);
router.put("/p/:id", updatePoints);
router.get("/:id", getTeamById);
router.delete("/:id", deleteTeam);

export default router;
