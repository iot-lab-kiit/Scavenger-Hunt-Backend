import { firebaseAuth } from "../lib/firebase-admin.js";
import UserModel from "../model/user.js";

export const authorizeUser = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Authorization failed, Auth Token is Required" });
    }
    const user = await firebaseAuth.verifyIdToken(token);
    const userRecord = await UserModel.findOneAndUpdate(
      { uid: user.uid },
      {
        name: user.name,
      },
      { new: true }
    );

    if (userRecord) {
      return res.json({ message: "User Updated", user: userRecord });
    }

    const newUser = new UserModel({
      _id: user.uid,
      email: user.email,
      name: user.name,
    });
    await newUser.save();
    return res.json({ message: "User Authorized", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
