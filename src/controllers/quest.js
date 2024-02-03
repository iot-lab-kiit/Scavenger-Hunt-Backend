import QuestsModel from "../model/quests.js";

export const getAllQuests = async (req, res) => {
  try {
    const quests = await QuestsModel.find();
    res.json(quests);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getQuestById = async (req, res) => {
  try {
    const id = req.params.id;
    const quest = await QuestModels.findById(id);
    res.json(quest);
  } catch (error) {
    res.json({ message: error });
  }
};
