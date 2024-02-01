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

export default router;
