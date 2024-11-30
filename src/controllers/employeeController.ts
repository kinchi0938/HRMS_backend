import { Request, Response } from "express";
import bcrypt from "bcrypt";
import Employee from "../models/Employee";
import ValidateEmail from "../utils/emailValidation";
import signJWT from "../utils/signJWT";

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

/** create a new Employee */
export const Signup = async (req: Request, res: Response) => {
  const {
    username,
    password,
    password2,
    firstName,
    lastName,
    email,
    street,
    housenumber,
    zipcode,
    city,
    country,
    role,
    admin,
  } = req.body;
  console.log(req.body);
  // check all the required fields
  if (
    !username ||
    !password ||
    !password2 ||
    !firstName ||
    !lastName ||
    !email ||
    !role
  ) {
    return res
      .status(403)
      .json({ errorMessage: "Please Check required fields" });
  }
  // Validate the email
  if (!ValidateEmail(email)) {
    return res.status(403).json({ errorMessage: "Invalid email address." });
  }

  if (password !== password2) {
    return res
      .status(403)
      .json({ errorMessage: "Password confirmation does not match." });
  }
  // check if there is a employee with same username
  const usernameExists = await Employee.exists({ username });
  if (usernameExists) {
    return res.status(403).json({
      errorMessage: "This username is already taken.",
    });
  }
  // check if there is a employee with same email
  const emailExists = await Employee.exists({ email });
  if (emailExists) {
    return res.status(403).json({
      errorMessage: "This email is already taken.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const createdUser = await Employee.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      street,
      housenumber,
      zipcode,
      city,
      country,
      role,
      admin,
    });
    res.status(200).json({ createdUser });
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

/** log in a new Employee   */
export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await Employee.findOne({ username });
  if (!user) {
    return res.status(400).json({
      errorMessage: "An account with this username does not exists.",
    });
  }
  try {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({
        errorMessage: "Wrong password",
      });
    } else {
      signJWT(user, (error, token) => {
        if (error) {
          return res.status(500).json({
            message: error.message,
            error: error,
          });
        } else if (token) {
          res.locals.token = token;
          return res.status(200).json({
            message: "Auth successful",
            token: token,
            username: user.username,
          });
        }
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error,
      });
    } else {
      console.log("Unexpected error", error);
    }
  }
};

/** get Employee */
export const employeerProfile = async (req: Request, res: Response) => {
  try {
    const user = await Employee.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    }
    try {
      const employee = await Employee.findById(req.params.id);
      return res.status(200).json(employee);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};

/** update a Employee */
export const editEmployee = async (req: Request, res: Response) => {
  const {
    username,
    firstName,
    lastName,
    email,
    street,
    housenumber,
    zipcode,
    city,
    country,
    role,
  } = req.body;

  // Validate the email
  if (!ValidateEmail(email)) {
    return res.status(403).json({ errorMessage: "Invalid email address." });
  }

  const EmployeeExists = await Employee.exists({
    $or: [{ username }, { email }],
  });
  if (EmployeeExists) {
    if (!username || !firstName || !lastName || !email || !role) {
      return res
        .json({ errorMessage: "Please Check required fields" })
        .status(401);
    }
    try {
      const editedEmployee = await Employee.findByIdAndUpdate(req.params.id, {
        username,
        firstName,
        lastName,
        email,
        street,
        housenumber,
        zipcode,
        city,
        country,
        role,
      });
      return res.status(200).json(editedEmployee);
    } catch (error) {
      return res.status(400).json({
        errorMessage: error,
      });
    }
  }
};

/** delete an Employee */
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deletedEmpolyee = await Employee.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedEmpolyee);
  } catch (error) {
    return res.status(400).json({
      errorMessage: error,
    });
  }
};
