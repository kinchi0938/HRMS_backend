import express from "express";
import { employeeList } from "../controllers/employeeController";

const employeeRouter = express.Router();

employeeRouter.get("/", employeeList);
employeeRouter.post("/");

export default employeeRouter;
