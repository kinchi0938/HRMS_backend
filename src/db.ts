import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error?: Error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
