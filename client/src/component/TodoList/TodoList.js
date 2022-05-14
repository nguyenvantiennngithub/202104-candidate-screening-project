import { Button } from "@mui/material";
import React from "react";
import { useDialog } from "../../hooks";
import { useTodo } from "../../store/hooks";
import TodoItem from "../TodoItem/TodoItem";
import DialogConfirm from "./Dialog/DialogConfirm";
import * as actionTodo from "../../store/todoAction";
import * as apiTodo from "../../api/todo";
import "./TodoList.css";

const TodoList = () => {
    const { state, dispatch } = useTodo();

    const { isOpenDialog, handleOpenDialog, handleCloseDialog } = useDialog();
    const handleClearCompleted = async () => {
        const listCompletedId = state.todos.reduce((total, todo) => {
            if (todo.isCompleted) total.push(todo.id);
            return total;
        }, []);

        const { data } = await apiTodo.clearCompleted({ listCompletedId });
        if (data.status === "success") {
            dispatch(actionTodo.clearCompleted(listCompletedId));
        }
    };
    return (
        <div className="todoList">
            <div className="todoList-header">
                <h2>Todo List</h2>
                <Button
                    color="error"
                    variant="contained"
                    onClick={handleOpenDialog}
                >
                    Clear complated
                </Button>
                <DialogConfirm
                    isOpenDialog={isOpenDialog}
                    handleCloseDialog={handleCloseDialog}
                    handleClearCompleted={handleClearCompleted}
                ></DialogConfirm>
            </div>
            {state.todos.map((item, index) => {
                return <TodoItem key={index} data={item}></TodoItem>;
            })}
        </div>
    );
};

export default TodoList;
