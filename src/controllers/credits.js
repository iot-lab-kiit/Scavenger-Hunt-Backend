import { createResponse } from "../../respo.js";
import { creditsData } from "../data/credit.js";
import { INTERNAL_SERVER_ERROR, STATUS_OK } from "../constants/index.js";

export default function credits(req, res) {
  try {
    res.send(createResponse(STATUS_OK, creditsData));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
}
