import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const questsSchema = new Schema({
  id: { type: String, required: true },
  theme: { type: String, required: true },
  hints: [{ type: Schema.Types.ObjectId, ref: "Hints" }],
});

const QuestsModel = model("Quests", questsSchema);
export default QuestsModel;
