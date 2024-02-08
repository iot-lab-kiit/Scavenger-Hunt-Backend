import dotenv from "dotenv";
import { createResponse } from "../../respo.js";
dotenv.config();

export const authToken = (req, res, next) => {
  if (process.env.ACCESS_TOKEN_DISABLED === "true") next();
  else {
    if (!req.headers.authorization) return res.send(createResponse(19));
    if (req.headers.authorization.split(" ")[1] === process.env.ACCESS_TOKEN)
      next();
    else return res.send(createResponse(20));
  }
};
