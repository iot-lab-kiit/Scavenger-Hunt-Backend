import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import teamRoute from "./src/routes/team.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017/scaveger";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/team", teamRoute);

app.use("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(mongo_uri)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
