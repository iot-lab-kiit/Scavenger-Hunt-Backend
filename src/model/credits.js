import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const CreditsSchema = new Schema({
  name: { type: String, required: true },
  instagram: { type: String, default: null },
  linkedIn: { type: String, default: null },
  github: { type: String, default: null },
  designation: { type: String, required: true },
});

const CreditsModel = model("Credits", CreditsSchema);
export default CreditsModel;
