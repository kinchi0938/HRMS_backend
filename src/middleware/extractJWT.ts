import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export interface decodedInterface extends JwtPayload {
  username: string | JwtPayload;
}

/** verify jwt token */
const extractJWT = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, SERVER_TOKEN_SECRET);
      (req as CustomRequest).token = decoded;
      next();
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

export default extractJWT;
