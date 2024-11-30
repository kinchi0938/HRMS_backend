import express from "express";

const rootRouter = express.Router();

rootRouter.get("/");
rootRouter.post("/signup");
rootRouter.post("/login");

export default rootRouter;
