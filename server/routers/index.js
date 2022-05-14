import apiRouter from "./todoController.js";
import express from "express";
const router = express.Router();

router.use("/api/todo", apiRouter);
export default router;
