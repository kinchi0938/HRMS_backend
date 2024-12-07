import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Employee from "./models/Employee";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error?: Error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

/** seed fake data to db */
const seed = async () => {
  for (let i = 0; i < 10; i++) {
    const employee = new Employee({
      username: faker.person.fullName(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      street: faker.location.street(),
      housenumber: faker.location.buildingNumber(),
      zipcode: parseInt(faker.location.zipCode()),
      city: faker.location.city(),
      country: faker.location.country(),
      role: faker.company.buzzNoun(),
    });

    try {
      const createdEmployee = await Employee.create(employee);
      console.log(createdEmployee);
    } catch (error) {
      console.log(error);
    }
  }
};
seed();
// npx ts-node src/seeder.ts => create fake user data
