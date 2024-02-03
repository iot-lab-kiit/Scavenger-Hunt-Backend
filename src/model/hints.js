import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const HintsSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, required: true, enum: ["main", "side"] },
  answer: { type: String, required: true },
});

const HintsModel = model("Hints", HintsSchema);
export default HintsModel;
