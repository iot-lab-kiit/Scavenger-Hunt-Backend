import { createResponse } from "../../respo.js";
import { firebaseAuth } from "../lib/firebase-admin.js";
import UserModel from "../model/user.js";

export const authorizeUser = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) return res.status(401).send(createResponse(4, null));
    const user = await firebaseAuth.verifyIdToken(token);
    const userRecord = await UserModel.findOneAndUpdate(
      { uid: user.uid },
      { name: user.name },
      { new: true }
    );
    if (userRecord) return res.status(200).send(createResponse(1, userRecord));
    const newUser = new UserModel({
      _id: user.uid,
      email: user.email,
      name: user.name,
    });
    await newUser.save();
    return res.status(200).send(createResponse(2, newUser));
  } catch (error) {
    console.error(error);
    res.status(500).send(createResponse(16, null));
  }
};
