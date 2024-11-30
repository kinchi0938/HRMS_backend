import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee";
import dotenv from "dotenv";

dotenv.config();

const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

interface decodedJWT {
  username: string;
}

/** get a logged in User */
export const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SERVER_TOKEN_SECRET);
      const currentUserName = (decoded as decodedJWT).username;
      const currentUser = await Employee.findOne({ username: currentUserName });
      return res.status(200).json(currentUser);
    } catch (error) {
      return res.status(404).json({
        message: error,
        error,
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
