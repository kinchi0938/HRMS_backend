import express from "express";
import { Signup } from "../controllers/employeeController";

const rootRouter = express.Router();

rootRouter.get("/");
rootRouter.post("/signup", Signup);
rootRouter.post("/login");

export default rootRouter;
