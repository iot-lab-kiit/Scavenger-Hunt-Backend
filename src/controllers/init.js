import { createResponse } from "../../respo.js";
import { userData } from "../data/user.js";
import { hintsData } from "../data/hints.js";
import { creditsData } from "../data/credit.js";
import UserModel from "../model/user.js";
import HintsModel from "../model/hints.js";
import dotenv from "dotenv";
import CreditsModel from "../model/credits.js";
dotenv.config();

export const initUser = async (req, res) => {
  try {
    await UserModel.deleteMany();
    await UserModel.insertMany(userData);
    return res.send(createResponse(21));
  } catch (error) {
    console.log(error);
    res.send(createResponse(16));
  }
};

export const initHints = async (req, res) => {
  try {
    await HintsModel.deleteMany();
    await HintsModel.insertMany(hintsData);
    return res.send(createResponse(21));
  } catch (error) {
    console.log(error);
    res.send(createResponse(16));
  }
};

export const initCredits = async (req, res) => {
  try {
    await CreditsModel.deleteMany();
    await CreditsModel.insertMany(creditsData);
    return res.send(createResponse(21));
  } catch (error) {
    console.log(error);
    res.send(createResponse(16));
  }
};
