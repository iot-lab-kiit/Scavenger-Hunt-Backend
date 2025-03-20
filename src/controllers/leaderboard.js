import { createResponse } from "../utils/respo.js";
import { INTERNAL_SERVER_ERROR, STATUS_OK } from "../constants/index.js";
import TeamModel from "../model/team.js";
import dotenv from "dotenv";
dotenv.config();

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await TeamModel.find()
      .sort({ score: -1, updatedAt: 1 })
      .select("teamName score");
    res.send(createResponse(STATUS_OK, leaderboard));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const getLeaderboardNum = async (req, res) => {
  try {
    const num = req.params.num;
    const leaderboard = await TeamModel.find()
      .sort({ score: -1, updatedAt: 1 })
      .limit(num)
      .exec()
      .select("teamName score");
    res.send(createResponse(STATUS_OK, leaderboard));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};
