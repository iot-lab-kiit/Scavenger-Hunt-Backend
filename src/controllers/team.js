import TeamModel from "../model/team.js";
import QuestsModel from "../model/quests.js";
import HintsModel from "../model/hints.js";
import UserModel from "../model/user.js";
import { createResponse } from "../../respo.js";
import {
  DATA_DELETED,
  DATA_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  STATUS_OK,
  TEAM_ALREADY_EXISTS,
  TEAM_ALREADY_REGISTERED,
  TEAM_CREATED,
  TEAM_SIZE_NOT_MET,
  TEAM_UPDATED,
  USER_ALREADY_LEAD,
  USER_NOT_AUTHORIZED,
} from "../constants/index.js";

const getRoute = async () => {
  try {
    const quests = await QuestsModel.find();
    const route = quests[Math.floor(Math.random() * quests.length)];
    return route._id;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.send(createResponse(STATUS_OK, teams));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const getTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const team = await TeamModel.findById(id)
      .populate("teamLead")
      .populate("teamMembers");
    res.send(createResponse(STATUS_OK, team));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const createTeam = async (req, res) => {
  try {
    const newTeam = new TeamModel(req.body);
    const user = await UserModel.findById(newTeam.teamLead).exec();
    if (!user) return res.send(createResponse(DATA_NOT_FOUND));
    if (user.isLead) return res.send(createResponse(USER_ALREADY_LEAD));
    if (user.team) return res.send(createResponse(TEAM_ALREADY_EXISTS));
    await newTeam.save();

    await UserModel.findByIdAndUpdate(
      user._id,
      { team: newTeam._id, isLead: true },
      { new: true }
    ).exec();

    const populatedTeam = await TeamModel.findById(newTeam._id)
      .populate("teamLead")
      .populate("teamMembers")
      .exec();

    res.send(createResponse(TEAM_CREATED, populatedTeam));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export async function updateTeam(req, res) {
  const id = req.params.id;
  try {
    const { userid, isRegistered } = req.body;
    const user = await UserModel.findOne({ uid: userid });
    const team = await TeamModel.findById(id);

    // isRegisterd : true -> check for team Lead -> check registration status -> team size -> register team else error
    // isRegisterd : false -> check for user in team -> update team members -> return updated team

    if (isRegistered === "true") {
      if (team.teamLead.toString() === user.id) {
        if (team.isRegistered === true) {
          return res.send(createResponse(TEAM_ALREADY_REGISTERED));
        } else if (
          team.teamMembers.length >= 3 &&
          team.teamMembers.length <= 5
        ) {
          const updatedTeam = await TeamModel.findByIdAndUpdate(
            id,
            { isRegistered, route: null },
            { new: true }
          )
            .populate("teamLead")
            .populate("teamMembers");
          return res.send(createResponse(TEAM_UPDATED, updatedTeam));
        } else return res.send(createResponse(TEAM_SIZE_NOT_MET));
      } else return res.send(createResponse(USER_NOT_AUTHORIZED));
    }
    if (team.teamMembers.includes(user._id))
      return res.send(createResponse(TEAM_ALREADY_EXISTS));
    if (team.teamMembers.length >= 5)
      return res.send(createResponse(TEAM_SIZE_NOT_MET));
    const updatedTeamMember = [...team.teamMembers, user._id];
    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      { teamMembers: updatedTeamMember },
      { new: true }
    )
      .populate("teamLead")
      .populate("teamMembers")
      .exec();
    const updateUser = await UserModel.findOneAndUpdate(
      { uid: userid },
      { team: updatedTeam._id },
      { new: true }
    );

    if (!updateUser) return res.send(createResponse(DATA_NOT_FOUND));
    if (!updatedTeam) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(TEAM_UPDATED, updatedTeam));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
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
      if (!hint) return res.send(createResponse(DATA_NOT_FOUND));
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
    )
      .populate("teamLead")
      .populate("teamMembers")
      .exec();
    res.send(createResponse(TEAM_UPDATED, updatedTeam));
  } catch (error) {
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}

export const deleteTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTeam = await TeamModel.findByIdAndDelete(id)
      .populate("teamLead")
      .populate("teamMembers")
      .exec();

    if (!deletedTeam) {
      return res.send(createResponse(DATA_NOT_FOUND));
    }
    res.send(createResponse(DATA_DELETED, deletedTeam));
  } catch (error) {
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};
