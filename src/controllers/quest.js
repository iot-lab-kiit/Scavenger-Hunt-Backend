import { createResponse } from "../../respo.js";
import { INTERNAL_SERVER_ERROR, STATUS_OK } from "../constants/index.js";
import QuestModel from "../model/quests.js";

export const getAllQuests = async (req, res) => {
  try {
    const quests = await QuestModel.find();
    res.send(createResponse(STATUS_OK, quests));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const getQuestById = async (req, res) => {
  try {
    const id = req.params.id;
    const quest = await QuestModel.findById(id);
    res.send(createResponse(STATUS_OK, quest));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const createQuest = (req, res) => {
  try {
    const quest = new QuestModel(req.body);
    quest.save();
    res.send(createResponse(STATUS_OK, quest));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};
