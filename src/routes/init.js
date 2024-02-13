import express from "express";
import { initCredits, initHints, initUser } from "../controllers/init.js";
const router = express.Router();

router.get("/user", initUser);
router.get("/hints", initHints);
router.get("/credits", initCredits);

export default router;
