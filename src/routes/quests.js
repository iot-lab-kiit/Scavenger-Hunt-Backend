import express from "express";
import {
  createQuest,
  getAllQuests,
  getQuestById,
} from "../controllers/quest.js";
const router = express.Router();

router.get("/", getAllQuests);
router.get("/q/:id", getQuestById);
router.post("/", createQuest);

export default router;
