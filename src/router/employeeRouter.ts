import express from "express";
import {
  editEmployee,
  employeeList,
  employeerProfile,
} from "../controllers/employeeController";
import extractJWT from "../middleware/extractJWT";

const employeeRouter = express.Router();

employeeRouter.get("/", extractJWT, employeeList);
employeeRouter.get("/:id", employeerProfile);
employeeRouter.patch("/edit/:id", extractJWT, editEmployee);

export default employeeRouter;
