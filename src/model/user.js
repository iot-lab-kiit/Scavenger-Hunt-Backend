import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  uid: { type: String, required: true },
  isLead: { type: Boolean, default: false },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
});

const UserModel = model("User", UserSchema);
export default UserModel;
