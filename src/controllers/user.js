import { createResponse } from "../../respo.js";
import {
  DATA_DELETED,
  DATA_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  STATUS_OK,
  USER_CREATED,
  USER_UPDATED,
} from "../constants/index.js";
import UserModel from "../model/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(createResponse(STATUS_OK, users));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ uid: id });
    res.send(createResponse(STATUS_OK, user));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const getUserTeamById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ uid: id }).populate("team");
    if (!user) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(STATUS_OK, user));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    // await newUser;
    res.send(createResponse(USER_CREATED, newUser));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
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
    if (!updatedUser) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(USER_UPDATED, updatedUser));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findOneAndDelete({ uid: id }).populate(
      "team"
    );
    if (!deletedUser) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(DATA_DELETED, deletedUser));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};
