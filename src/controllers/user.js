import { createResponse } from "../../respo.js";
import UserModel from "../model/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(createResponse(15, users));
  } catch (error) {
    res.status(500).send(createResponse(16, error));
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ uid: id });
    res.status(200).send(createResponse(1, user));
  } catch (error) {
    res.status(500).send(createResponse(16, error));
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).send(createResponse(2, newUser));
  } catch (error) {
    res.status(500).send(createResponse(16, error));
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, isLead, team } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { uid: id },
      {
        name,
        email,
        password,
        isLead,
        team,
      },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).send(createResponse(15, "User not found"));
    res.status(200).send(createResponse(5, updatedUser));
  } catch (error) {
    res.status(500).send(createResponse(16, error));
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findOneAndDelete({ uid: id });
    if (!deletedUser)
      return res.status(404).send(createResponse(15, "User Not Found"));
    res.status(200).send(createResponse(12, deletedUser));
  } catch (error) {
    res.status(500).send(createResponse(16, error));
  }
};
