import mongoose, { ObjectId, model, Schema } from "mongoose";

const TeamSchema = new Schema({
  teamName: { type: String, required: true },
  teamLead: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  totalMain: { type: Number, default: 0 },
  totalSide: { type: Number, default: 0 },
  doc: { type: String, default: null },
  theme: { type: String, default: null },
  score: { type: Number, default: 0 },
  numMain: { type: Number, default: 0 },
  numSide: { type: Number, default: 0 },
  mainQuest: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Hints", default: null },
  ],
  sideQuest: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Hints", default: null },
  ],
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Quests", default: null },
  isRegistered: { type: Boolean, default: false },
});

const TeamModel = model("Team", TeamSchema);
export default TeamModel;
