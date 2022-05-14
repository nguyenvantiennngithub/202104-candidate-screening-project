import express from "express";
const router = express.Router();
import * as todoController from "../controller/todoController.js";

router.post("/addTodo", todoController.addTodo);
router.get("/getAll", todoController.getAllTodo);
router.patch("/setCompleted/:id", todoController.setCompletedTodo);
router.patch("/clearCompleted", todoController.clearCompletedTodo);

export default router;
