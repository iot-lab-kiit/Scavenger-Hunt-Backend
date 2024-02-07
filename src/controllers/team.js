import TeamModel from "../model/team.js";
import QuestsModel from "../model/quests.js";
import HintsModel from "../model/hints.js";
import UserModel from "../model/user.js";
import { createResponse } from "../../respo.js";

const getRoute = async () => {
  try {
    const quests = await QuestsModel.find();
    const route = quests[Math.floor(Math.random() * quests.length)];
    return route._id;
  } catch (error) {
    return error;
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.status(200).send(createResponse(1, teams));
  } catch (err) {
    res.status(500).send(createResponse(16, error.message));
  }
};

export const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await TeamModel.findById(id);
    res.status(200).send(createResponse(1, team));
  } catch (error) {
    res.status(500).send(createResponse(16, error.message));
  }
};

export const createTeam = async (req, res) => {
  try {
    const newTeam = new TeamModel(req.body);
    const user = await UserModel.findById(newTeam.teamLead);
    if (user.isLead)
      return res
        .status(403)
        .send(createResponse(10, "User already lead of a team"));
    if (user.team)
      return res.status(403).send(createResponse(10, "User already in a team"));
    await newTeam.save();
    const updateUser = await UserModel.findByIdAndUpdate(
      user._id,
      { team: newTeam._id, isLead: true },
      { new: true }
    );
    console.log(updateUser);
    res.status(200).send(createResponse(7, newTeam));
  } catch (error) {
    res.status(500).send(createResponse(16, error.message));
  }
};

export async function updateTeam(req, res) {
  const id = req.params.id;
  try {
    const { userid, isRegistered } = req.body;
    const user = await UserModel.findOne({ uid: userid });
    const team = await TeamModel.findById(id);
    console.log(team);
    const updatedTeamMember = [...team.teamMembers, user._id];

    if (isRegistered && team.teamLead._id === user._id) {
      if (team.isRegistered)
        return res
          .status(403)
          .send(createResponse(10, "Team already registered"));
      else if (updatedTeamMember.length >= 3 && updatedTeamMember.length <= 5) {
        const updatedTeam = await TeamModel.findByIdAndUpdate(
          id,
          { isRegistered, route: await getRoute() },
          { new: true }
        );
        return res.status(200).send(createResponse(8, updatedTeam));
      } else
        return res
          .status(403)
          .send(
            createResponse(11, "Team size not met. Go get yourself a friend")
          );
    }

    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      { teamMembers: updatedTeamMember },
      { new: true }
    );
    const updateUser = await UserModel.findOneAndUpdate(
      { uid: userid },
      { team: updatedTeam._id },
      { new: true }
    );
    if (!updateUser)
      return res.status(404).send(createResponse(15, "User not found"));
    if (!updatedTeam)
      return res.status(404).send(createResponse(15, "Team not found"));
    res.status(200).send(createResponse(8, updatedTeam));
  } catch (error) {
    res.status(500).send(createResponse(16, error.message));
  }
}

export async function updatePoints(req, res) {
  const { id } = req.params;
  let mainQuest = [];
  let sideQuest = [];
  try {
    const { score, hintId } = req.body;
    const team = await TeamModel.findById(id);
    mainQuest =
      Array.isArray(team.mainQuest) && team.mainQuest.length > 0
        ? team.mainQuest
        : [];
    sideQuest =
      Array.isArray(team.sideQuest) && team.sideQuest.length > 0
        ? team.sideQuest
        : [];

    const quests = team.route;
    if (quests.hints[team.numMain].toString() === hintId)
      mainQuest = [...mainQuest, hintId];
    else {
      const hint = await HintsModel.findOne({ _id: hintId, type: "side" });
      if (!hint)
        return res.status(404).send(createResponse(15, "Hint not found"));
    }
    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      {
        score: team.score + score,
        numMain: mainQuest.length,
        numSide: sideQuest.length,
        mainQuest: mainQuest,
        sideQuest: sideQuest,
      },
      { new: true }
    );
    res.status(200).send(createResponse(8, updatedTeam));
  } catch (error) {
    res.status(500).send(createResponse(16, error.message));
  }
}

export const deleteTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTeam = await TeamModel.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).send(createResponse(15, "Team not found"));
    }
    res.status(200).send(createResponse(12, "Team Delete Successfully"));
  } catch (error) {
    res.status(500).send(createResponse(16, error.message));
  }
};
