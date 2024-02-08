import { createResponse } from "../../respo.js";
import Hints from "../model/hints.js";
import dotenv from "dotenv";
dotenv.config();

export async function getQuestions(req, res) {
  try {
    const allQuestions = await Hints.find({});
    if (!allQuestions)
      return res.status(404).send(createResponse(15, "No questions found"));

    if (process.env.ENABLE_PAGE_RENDER === "true")
      res.render("show.ejs", { allQuestions });
    else return res.status(200).send(createResponse(1, allQuestions));
  } catch (err) {
    return res.status(500).send(createResponse(err.message));
  }
}

export async function getQuestionsbyId(req, res) {
  const { id } = req.params;
  console.log(id);
  try {
    const question = await Hints.findById(id);
    if (!question)
      return res.status(404).send(createResponse(15, "No question found"));
    console.log(question);
    return res.send(200).send(createResponse(1, question));
  } catch (err) {
    res.status(500).send(createResponse(16, err.message));
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
  } catch (err) {
    res.status(500).send(createResponse(16, err.message));
  }
}

export async function editForm(req, res) {
  try {
    const question = await Hints.findById(req.params.id);
    console.log(question);
    res.render("edit.ejs", { question });
  } catch (error) {
    res.status(500).send(createResponse(16, err.message));
  }
}

export async function editQuestion(req, res) {
  try {
    const updatedQuestion = await Hints.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(updatedQuestion);
    console.log("Question updated successfully");
    return res.redirect("/hints");
  } catch (err) {
    res.status(500).send(createResponse(16, err.message));
  }
}

export async function deleteQuestion(req, res) {
  try {
    const deletedQuestion = await Hints.findByIdAndDelete(req.params.id);
    console.log(deletedQuestion);
    console.log("Question Deleted Successfully");
    res.redirect("/hints");
  } catch (err) {
    res.status(500).send(createResponse(16, err.message));
  }
}
