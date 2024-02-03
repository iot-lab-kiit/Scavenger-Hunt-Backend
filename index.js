import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import methodOverride from "method-override";

import auth from "./src/routes/auth.js";
import hints from "./src/routes/hints.js";
import quests from "./src/routes/quests.js";
import teamRoute from "./src/routes/team.js";
import userRoute from "./src/routes/users.js";
import leaderboard from "./src/routes/leaderboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const mongo_uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/scavenger";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "src", "views"));

import { authToken } from "./src/middlewares/auth.js";

app.use("/auth", auth);
app.use("/quests", quests);
app.use("/user", userRoute);
app.use("/team", teamRoute);
app.use("/hints", authToken, hints);
app.use("/leaderboard", leaderboard);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to the Scavenger Hunt API" });
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
