import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const questsSchema = new Schema({
  theme: { type: String, required: true },
  hints: [{ type: Schema.Types.ObjectId, ref: "Hints" }],
  doc: { type: String, required: true },
});

const QuestsModel = model("Quests", questsSchema);
export default QuestsModel;
