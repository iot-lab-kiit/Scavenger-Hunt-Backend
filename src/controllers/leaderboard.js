import TeamModel from "../model/team.js";

let leaderboard = "";
async function fetchLeaderBoard() {
  console.log("updating leaderboard....");
  const teams = await TeamModel.find().sort({
    score: -1,
  });
  leaderboard = teams.map((team) => {
    return {
      id: team.id,
      name: team.teamName,
      leader: team.teamLead,
      score: team.score,
    };
  });
}
setInterval(async () => {
  await fetchLeaderBoard();
}, 2 * 1000); // Change this to 2 minutes

export const getLeaderboard = async (req, res) => {
  res.send(leaderboard);
};

export const getLeaderboardNum = async (req, res) => {
  const num = req.params.num;
  if (num === -1) {
    await fetchLeaderBoard();
    return res.send(leaderboard);
  } else res.send(leaderboard.slice(0, num));
};
