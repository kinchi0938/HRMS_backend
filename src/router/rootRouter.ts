import express from "express";
import { Login, Signup } from "../controllers/employeeController";

const rootRouter = express.Router();

rootRouter.get("/");
rootRouter.post("/signup", Signup);
rootRouter.post("/login", Login);

export default rootRouter;
