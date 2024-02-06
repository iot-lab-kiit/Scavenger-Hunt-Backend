import { createResponse } from "../../respo.js";
import QuestModel from "../model/quests.js";

export const getAllQuests = async (req, res) => {
  try {
    const quests = await QuestModel.find();
    res.status(200).send(createResponse(1, quests));
  } catch (error) {
    res.status(500).send(createResponse(16, err.message));
  }
};

export const getQuestById = async (req, res) => {
  try {
    const id = req.params.id;
    const quest = await QuestModel.findById(id);
    res.status(200).send(createResponse(quest));
  } catch (error) {
    res.status(500).send(createResponse(16, err.message));
  }
};
