import dotenv from "dotenv";
import { createResponse } from "../../respo.js";
import { firebaseAuth } from "../lib/firebase-admin.js";
dotenv.config();

// export const authToken = (req, res, next) => {
//   if (process.env.ACCESS_TOKEN_DISABLED === "true") next();
//   else {
//     if (!req.headers.authorization) return res.send(createResponse(19));
//     if (req.headers.authorization.split(" ")[1] === process.env.ACCESS_TOKEN)
//       next();
//     else return res.send(createResponse(20));
//   }
// };

// export const authToken = async (req, res, next) => {
//   next();
// };

export const authToken = async (req, res, next) => {
  let token;
  try {
    if (process.env.ACCESS_TOKEN_DISABLED === "true") next();
    else {
      if (req.headers.authorization)
        token = req.headers.authorization.split(" ")[1];
      if (!req.headers.authorization || !token)
        return res.send(createResponse(19));
      if (await verifyIdToken(token)) next();
      else return res.send(createResponse(20));
    }
  } catch (error) {
    console.log(error);
    return res.send(createResponse(16));
  }
};

const verifyIdToken = async (token) => {
  try {
    const user = await firebaseAuth.verifyIdToken(token);
    // console.log(user);
    return user ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
