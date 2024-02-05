import dotenv from "dotenv";
dotenv.config();

export const authToken = (req, res, next) => {
  if (process.env.ACCESS_TOKEN_DISABLED === "true") next();
  else {
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ error: "Unauthorized: Access token missing" });
    if (req.headers.authorization === process.env.ACCESS_TOKEN) next();
    else
      return res
        .status(401)
        .json({ error: "Unauthorized: Invalid access token" });
  }
};
