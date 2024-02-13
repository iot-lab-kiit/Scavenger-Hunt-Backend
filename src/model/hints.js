import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const HintsSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, required: true, enum: ["main", "side"] },
  answer: { type: String, required: true },
  campus: { type: Number, required: true },
  theme: { type: String, required: true },
  imageURL: { type: String, default: null },
});

const HintsModel = model("Hints", HintsSchema);
export default HintsModel;
