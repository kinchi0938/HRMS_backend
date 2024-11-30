import "./db";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import rootRouter from "./router/rootRouter";
import employeeRouter from "./router/employeeRouter";

dotenv.config();

const app = express();
const logger = morgan("dev");

app.use(cors());

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", rootRouter);
app.use("/employee", employeeRouter);

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
