import dotenv from "dotenv";
dotenv.config();
export const authToken = (req, res, next) => {
  if (process.env.ACCESS_TOKEN_DISABLED) next();
  else if (
    req.headers.authorization &&
    req.headers.authorization === `Bearer ${process.env.ACCESS_TOKEN}`
  )
    next();
  else res.status(401).json({ error: "Unauthorized" });
};
