import express from "express";
import {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/team.js";
const router = express.Router();

router.post("/", createTeam);
router.get("/", getAllTeams);
router.put("/:id", updateTeam);
router.get("/:id", getTeamById);
router.delete("/:id", deleteTeam);

export default router;
