import express from "express";
import {
  deleteEmployee,
  editEmployee,
  employeeList,
  employeerProfile,
} from "../controllers/employeeController";
import extractJWT from "../middleware/extractJWT";

const employeeRouter = express.Router();

employeeRouter.get("/", extractJWT, employeeList);
employeeRouter.get("/:id", employeerProfile);
employeeRouter.put("/edit/:id", extractJWT, editEmployee);
employeeRouter.delete("/:id", extractJWT, deleteEmployee);

export default employeeRouter;
