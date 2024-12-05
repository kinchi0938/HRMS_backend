import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import signJWT from "../utils/signJWT";

dotenv.config();

const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

interface decodedJWT {
  username: string;
}

/** log in a User   */
export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await Employee.findOne({ username });
  if (!user) {
    return res.status(400).json({
      errorMessage: "An account with this username does not exists.",
    });
  }
  try {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({
        errorMessage: "Wrong password",
      });
    } else {
      signJWT(user, (error, token) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error: error,
          });
        } else if (token) {
          res.locals.token = token;
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            user: {
              username: user.username,
              id: user._id,
            },
          });
        }
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error,
      });
    } else {
      console.log("Unexpected error", error);
    }
  }
};

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
