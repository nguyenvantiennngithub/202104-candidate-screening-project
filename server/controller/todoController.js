import * as todoService from "../service/todoService.js";

async function getAllTodo(req, res) {
    const todos = await todoService.getAllTodo();
    return res.json({ todos: todos, status: "success" });
}

async function addTodo(req, res) {
    const { content, dueDate, isSetDueDate } = req.body;

    const idTaskInserted = await todoService.addTodo(
        content,
        dueDate,
        isSetDueDate
    );

    const todoInserted = await todoService.getTodoById(idTaskInserted);
    if (todoInserted)
        return res.json({ todo: todoInserted, status: "success" });

    return res.json({ todo: null, status: "fail" });
}

async function setCompletedTodo(req, res) {
    const { id, isCompleted } = req.body;
    const completeChecked = isCompleted ? 1 : 0;
    const isSuccess = await todoService.setCompletedTodo(id, completeChecked);
    const status = isSuccess ? "success" : "fail";
    return res.json({ status });
}

async function clearCompletedTodo(req, res) {
    const { listCompletedId } = req.body;
    const listCompletedIdChecked = listCompletedId.join(",");
    const isSuccess = todoService.clearCompletedTodo(listCompletedIdChecked);
    const status = isSuccess ? "success" : "fail";
    return res.json({ status });
}

export { addTodo, clearCompletedTodo, setCompletedTodo, getAllTodo };
