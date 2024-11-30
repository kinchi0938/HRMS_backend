import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Employee from "../models/Employee";
import ValidateEmail from "../utils/emailValidation";

//** get all employees from db */
export const employeeList = async (req: Request, res: Response) => {
  try {
    const allEmployees = await Employee.find();
    return res.status(200).json(allEmployees);
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};
