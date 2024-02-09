import express from "express";
import { initHints, initUser } from "../controllers/init.js";
const router = express.Router();

router.get("/user", initUser);
router.get("/hints", initHints);

export default router;
