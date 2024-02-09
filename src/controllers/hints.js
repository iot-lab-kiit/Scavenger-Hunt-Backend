import { createResponse } from "../../respo.js";
import {
  DATA_DELETED,
  DATA_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from "../constants/index.js";
import Hints from "../model/hints.js";
import dotenv from "dotenv";
dotenv.config();

export async function getQuestions(req, res) {
  try {
    const allQuestions = await Hints.find({});
    if (!allQuestions) return res.send(createResponse(DATA_NOT_FOUND));

    if (process.env.ENABLE_PAGE_RENDER === "true")
      res.render("show.ejs", { allQuestions });
    else return res.send(createResponse(STATUS_OK, allQuestions));
  } catch (error) {
    console.log(error);
    return res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}

export async function getQuestionsbyId(req, res) {
  const { id } = req.params;
  try {
    const question = await Hints.findById(id);
    if (!question) return res.send(createResponse(DATA_NOT_FOUND));
    return res.send(createResponse(STATUS_OK, question));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}

export function newForm(req, res) {
  res.render("new.ejs");
}

export async function newQuestion(req, res) {
  try {
    console.log(req.body);
    const newQuestion = await Hints.create(req.body);
    console.log(newQuestion);
    console.log("Question saved!");
    res.redirect("/hints");
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}

export async function editForm(req, res) {
  try {
    const question = await Hints.findById(req.params.id);
    console.log(question);
    res.render("edit.ejs", { question });
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}

export async function editQuestion(req, res) {
  try {
    const updatedQuestion = await Hints.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.redirect("/hints");
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}

export async function deleteQuestion(req, res) {
  try {
    const deletedQuestion = await Hints.findByIdAndDelete(req.params.id);
    if (process.env.ENABLE_PAGE_RENDER === "true")
      return res.redirect("/hints");
    else return res.send(createResponse(DATA_DELETED, deletedQuestion));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}
