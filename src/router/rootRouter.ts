import express from "express";
import { Signup } from "../controllers/employeeController";
import { loggedInUser, Login } from "../controllers/userController";

const rootRouter = express.Router();

rootRouter.get("/", loggedInUser);
rootRouter.post("/signup", Signup);
rootRouter.post("/login", Login);

export default rootRouter;
