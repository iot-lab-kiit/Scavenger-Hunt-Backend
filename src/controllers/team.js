import TeamModel from "../model/team.js";
import QuestsModel from "../model/quests.js";
import HintsModel from "../model/hints.js";
import UserModel from "../model/user.js";

// get all route id from quest model and return random route id
export const getRoute = async (req, res) => {
  try {
    const quests = await QuestsModel.find();
    const route = quests[Math.floor(Math.random() * quests.length)];
    res.json(route);
  } catch (error) {
    res.json({ message: error });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.json(teams);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await TeamModel.findById(id);
    res.json(team);
  } catch (error) {
    res.json({ message: error });
  }
};

// team leader will create team
export const createTeam = async (req, res) => {
  try {
    const newTeam = new TeamModel(req.body);
    // body mei, teamMember mei, lead ka name bhi hoga
    await newTeam.save();
    res
      .status(201)
      .json({ message: "New team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Will update team, and once isRegistered is true, send, team registered
// export const updateTeam = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { teamMembers, score, mainQuest, sideQuest, isRegistered } = req.body;
//     // not known attrib shall be null and 0 if not specified
//     const team = await TeamModel.findById(id);
//     // team.teamMembers.push(teamMembers);
//     const updatedTeamMember = [...team.teamMembers, teamMembers];
//     if (team.isRegistered === true)
//       return res.status(401).json({ message: "Team already registered" });
//     const updatedTeam = await TeamModel.findByIdAndUpdate(
//       id,
//       {
//         teamMembers: updatedTeamMember,
//         score,
//         numMain: team.numMain + 1,
//         numSide: team.numSide + 1,
//         mainQuest,
//         sideQuest,
//         isRegistered,
//       },
//       { new: true }
//     );
//     if (!updatedTeam)
//       return res.status(404).json({ message: "Team not found" });

//     res.status(200).json({
//       message: "Team details updated successfully",
//       team: updatedTeam,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

// will handle isRegistration true and additiong of team members
export async function updateTeam(req, res) {
  const id = req.params.id;
  try {
    const { userid, isRegistered } = req.body;
    const user = await UserModel.find({ uid: userid });
    const team = await TeamModel.findById(user.id);
    const updatedTeamMember = [...team.teamMembers, user.id];
    if (isRegistered) {
      if (updatedTeamMember.length >= 3 && updatedTeamMember.length <= 5)
        return res.status(200).json({ message: "Team Registered" });
      else
        return res.status(401).json({
          message: "Team size not met. Go get yourself a friend",
        });
    }
    if (team.isRegistered === true)
      return res.status(401).json({ message: "Team already registered" });
    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      {
        teamMembers: updatedTeamMember,
        isRegistered,
        route: await getRoute(),
      },
      { new: true }
    );
    const updateUser = await UserModel.findByIdAndUpdate(
      user.id,
      {
        team: updatedTeam.id,
      },
      { new: true }
    );
    if (!updateUser) return res.status(404).json({ message: "User not found" });
    if (!updatedTeam)
      return res.status(404).json({ message: "Team not found" });
    res.status(200).json({
      message: "Team details updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
}

export async function updatePoints(req, res) {
  const { id } = req.params.id;
  const mainQuest = [];
  const sideQuest = [];
  try {
    const { score, questId } = req.body;
    const team = TeamModel.findById(id);
    const quests = QuestsModel.findById(team.route);
    if (quests.hint[team.numMain] === questId) {
      mainQuest = [...team.mainQuest, questId];
    } else {
      const hint = HintsModel.findById(questId);
      if (hint === null)
        return res.status(404).json({ message: "Hint not found" });
      else sideQuest = [...team.sideQuest, questId];
    }
    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      {
        score: team.score + score,
        numMain: team.numMain + 1,
        numSide: team.numSide + 1,
        mainQuest: mainQuest,
        sideQuest: sideQuest,
      },
      { new: true }
    );

    res.send(updatedTeam);
  } catch (error) {}
}

export const deleteTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTeam = await TeamModel.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
