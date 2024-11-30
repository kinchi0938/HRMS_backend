import express from "express";
import { Login, Signup } from "../controllers/employeeController";
import { loggedInUser } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", loggedInUser);
rootRouter.post("/signup", Signup);
rootRouter.post("/login", Login);

export default rootRouter;
