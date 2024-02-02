import express from "express";
const router = express.Router();
import UserModel from "../model/user";

//GET /user - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.json({ message: error });
  }
});

//GET /user/:id - Get user with id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.find(id);
    res.json(user);
  } catch (error) {
    res.json({ message: error });
  }
});

//POST /user - Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "New user created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//PUT /user/:id - Update User details
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, isLead, team } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        isLead,
        team,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
