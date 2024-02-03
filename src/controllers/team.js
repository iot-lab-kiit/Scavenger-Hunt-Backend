import TeamModel from "../model/team.js";

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

export const createTeam = async (req, res) => {
  try {
    const newTeam = new TeamModel(req.body);
    await newTeam.save();
    res
      .status(201)
      .json({ message: "New team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      teamName,
      teamLead,
      teamMembers,
      score,
      mainQuest,
      sideQuest,
      route,
    } = req.body;
    const team = await TeamModel.findById(id);
    const updatedTeamMember = [...team.teamMembers, ...teamMembers];
    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      {
        teamName,
        teamLead,
        teamMembers: updatedTeamMember,
        score,
        mainQuest,
        sideQuest,
        route,
      },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({
      message: "Team details updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

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
