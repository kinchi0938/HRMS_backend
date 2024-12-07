import express from "express";
import { createComment } from "../controllers/commentController";
import extractJWT from "../middleware/extractJWT";

const commentRouter = express.Router();

commentRouter.post("/", extractJWT, createComment);

export default commentRouter;
