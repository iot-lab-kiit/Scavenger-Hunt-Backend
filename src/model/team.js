const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeamSchema = new Schema({
  teamName: { type: String, required: true },
  teamLead: mongoose.ObjectId,
  teamMembers: [mongoose.ObjectId],
  score: Number,
  mainQuest: [mongoose.ObjectId],
  sideQuest: [mongoose.ObjectId],
  route: mongoose.ObjectId,
});

const TeamModel = mongoose.model("Team", UserSchema);

module.exports = TeamModel;
