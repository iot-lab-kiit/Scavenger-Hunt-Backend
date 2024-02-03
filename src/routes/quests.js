import express from "express";
import { getAllQuests, getQuestById } from "../controllers/quest";
const router = express.Router();

router.get("/", getAllQuests);
router.get("/q/:id", getQuestById);

export default router;
