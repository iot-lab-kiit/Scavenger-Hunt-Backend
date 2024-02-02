import express from "express";
const router = express.Router();
import TeamModel from "../model/team.js";

router.get("/", async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.json(teams);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET /team/:id - Get team with id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const team = await TeamModel.get(id);
    res.json(team);
  } catch (error) {
    res.json({ message: error });
  }
});

//POST /team - Create a new Team, with details, also
router.post("/", async (req, res) => {
  try {
    const newteam = new TeamModel(req.body);
    await newteam.save();
    res
      .status(201)
      .json({ message: "New team created successfully", team: newteam });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//PUT /team/:id - Update Team details
router.put("/:id", async (req, res) => {
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
    const updatedTeam = await TeamModel.findByIdAndUpdate(
      id,
      {
        teamName,
        teamLead,
        teamMembers,
        score,
        mainQuest,
        sideQuest,
        route,
      },
      {
        new: true,
      }
    );

    if (!updatedTeam) {
      res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({
      message: "Team details updated successfully",
      team: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
