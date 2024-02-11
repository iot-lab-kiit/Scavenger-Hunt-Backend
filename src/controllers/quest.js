import { createResponse } from "../../respo.js";
import { INTERNAL_SERVER_ERROR, STATUS_OK } from "../constants/index.js";
import QuestModel from "../model/quests.js";

export const getAllQuests = async (req, res) => {
  try {
    const quests = await QuestModel.find();
    if (!quests) return res.send(createResponse(DATA_NOT_FOUND));
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
    if (!quest) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(STATUS_OK, quest));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const createQuest = async (req, res) => {
  try {
    const quest = new QuestModel(req.body);
    await quest.save();
    if (!quest) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(STATUS_OK, quest));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};
