import { createResponse } from "../../respo.js";
import { STATUS_OK } from "../constants/index.js";
import TeamModel from "../model/team.js";
import dotenv from "dotenv";
dotenv.config();

let leaderboard = "";
async function fetchLeaderBoard() {
  if (process.env.SHOW_UPDATE === "true")
    console.log("Fetching Leaderboard....");
  const team = await TeamModel.find()
    .sort({ score: -1 })
    .select("teamName score");
  leaderboard = team;
}
setInterval(async () => {
  await fetchLeaderBoard();
}, 10 * 1000); // Change this to 2 minutes

export const getLeaderboard = async (req, res) => {
  res.send(createResponse(STATUS_OK, leaderboard));
};

export const getLeaderboardNum = async (req, res) => {
  const num = req.params.num;
  if (num === -1) {
    await fetchLeaderBoard();
    return res.send(createResponse(STATUS_OK, leaderboard));
  } else res.send(createResponse(STATUS_OK, leaderboard.slice(0, num)));
};
