import { createResponse } from "../../respo.js";
import {
  INTERNAL_SERVER_ERROR,
  STATUS_OK,
  USER_CREATED,
  USER_NOT_AUTHORIZED,
} from "../constants/index.js";
import { firebaseAuth } from "../lib/firebase-admin.js";
import UserModel from "../model/user.js";

export const authorizeUser = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) return res.send(createResponse(USER_NOT_AUTHORIZED));
    const user = await firebaseAuth.verifyIdToken(token);
    const record = await firebaseAuth.getUser(user.uid);
    const email = record.providerData[0].email;
    const userRecord = await UserModel.findOneAndUpdate(
      { uid: user.uid },
      { name: user.name },
      { new: true }
    );
    if (userRecord)
      return res.status(200).send(createResponse(STATUS_OK, userRecord));
    const newUser = new UserModel({
      uid: user.uid,
      email,
      name: user.name,
    });
    await newUser.save();
    return res.send(createResponse(USER_CREATED, newUser));
  } catch (error) {
    console.log(error);
    res.send(createResponse(INTERNAL_SERVER_ERROR));
  }
};
