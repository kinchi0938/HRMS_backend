import jwt from "jsonwebtoken";
import { IEmployee } from "../types/model.type";
import dotenv from "dotenv";

dotenv.config();

const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "hannesIssuer";
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

// set a jwt token for logged in User
const signJWT = (
  user: IEmployee,
  callback: (error: Error | null, token: string | null) => void
): void => {
  try {
    jwt.sign(
      {
        username: user.username,
      },
      SERVER_TOKEN_SECRET,
      {
        issuer: SERVER_TOKEN_ISSUER,
        algorithm: "HS256",
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      callback(error, null);
    } else {
      console.log("Unexpected error", error);
    }
  }
};

export default signJWT;
