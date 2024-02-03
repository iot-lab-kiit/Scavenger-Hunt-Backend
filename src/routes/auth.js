import express from "express";
import { authorizeUser } from "../controllers/auth.js";
const router = express.Router();

router.post("/", authorizeUser);

export default router;
