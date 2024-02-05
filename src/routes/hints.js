import express from "express";
import {
  deleteQuestion,
  editForm,
  editQuestion,
  getQuestions,
  getQuestionsbyId,
  newForm,
  newQuestion,
} from "../controllers/hints.js";
import { authToken } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", getQuestions);
router.get("/q/:id", getQuestionsbyId);
router.get("/new", newForm);
router.post("/new", newQuestion);
router.get("/edit/:id", editForm);
router.patch("/edit/:id", editQuestion);
router.delete("/delete/:id", authToken, deleteQuestion);

export default router;
