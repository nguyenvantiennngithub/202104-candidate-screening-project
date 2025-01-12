import { Button } from "@mui/material";
import React from "react";
import { useTodo } from "../../store/hooks";
import TodoItem from "../TodoItem/TodoItem";
import * as actionTodo from "../../store/todoAction";
import * as apiTodo from "../../api/todo";
import "./TodoList.css";

const TodoList = () => {
    const { state, dispatch } = useTodo();

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
                    onClick={handleClearCompleted}
                    id="clear-completed-todo"
                >
                    Clear complated
                </Button>
            </div>
            {state.todos.map((item) => {
                return <TodoItem key={item.id} data={item}></TodoItem>;
            })}
        </div>
    );
};

export default TodoList;
