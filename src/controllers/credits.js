import { name } from "ejs";
import { createResponse } from "../../respo.js";
import {
  DATA_NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  STATUS_OK,
} from "../constants/index.js";
import CreditsModel from "../model/credits.js";

export async function credits(req, res) {
  try {
    const creditsData = await CreditsModel.find();
    if (!creditsData) return res.send(createResponse(DATA_NOT_FOUND));
    res.send(createResponse(STATUS_OK, creditsData));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}
