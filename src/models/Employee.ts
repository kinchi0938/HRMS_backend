import mongoose, { Document, Schema } from "mongoose";
import { IComment, IEmployee } from "../types/model.type";

export interface IEmployeeModel extends IEmployee, Document {}

const EmployeeSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  street: String,
  housenumber: String,
  zipcode: Number,
  city: String,
  country: String,
  role: { type: String, required: true },
  admin: Boolean,
  comments: Array<IComment>,
});

const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);

export default Employee;
