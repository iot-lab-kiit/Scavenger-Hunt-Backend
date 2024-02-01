import mongoose, { ObjectId, model, Schema } from "mongoose";
// const { Schema } = mongoose;

const TeamSchema = new Schema({
  teamName: { type: String, required: true },
  teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  score: { type: Number, default: 0 },
  mainQuest: [ObjectId],
  sideQuest: [ObjectId],
  route: ObjectId,
});

const TeamModel = model("Team", TeamSchema);
export default TeamModel;
