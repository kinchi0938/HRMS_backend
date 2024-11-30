import express from "express";
import {
  employeeList,
  employeerProfile,
} from "../controllers/employeeController";

const employeeRouter = express.Router();

employeeRouter.get("/", employeeList);
employeeRouter.get("/:id", employeerProfile);
employeeRouter.post("/");

export default employeeRouter;
