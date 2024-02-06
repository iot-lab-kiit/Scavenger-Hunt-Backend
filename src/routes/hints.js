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
const router = express.Router();

router.get("/", getQuestions);
router.get("/q/:id", getQuestionsbyId);
router.get("/new", newForm);
router.post("/new", newQuestion);
router.get("/edit/:id", editForm);
router.patch("/edit/:id", editQuestion);
router.delete("/delete/:id", deleteQuestion);

export default router;
