import express from "express";
import teamController from "../controllers/team.js";

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.post("/", teamController.createTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

export default router;
