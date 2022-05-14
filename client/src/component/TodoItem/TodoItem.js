import React from "react";
import Checkbox from "@mui/material/Checkbox/";

import { useTodo } from "../../store/hooks";
import * as actionTodo from "../../store/todoAction";
import * as apiTodo from "../../api/todo";
import "./TodoItem.css";

const TodoItem = ({ data }) => {
    const { isCompleted, content, id, dueDate } = data;
    const date = new Date(dueDate);
    const now = new Date();
    const { dispatch } = useTodo();
    const isDueDate = date.getTime() - now.getTime() <= 0;

    const handleCheckComplete = () => {
        async function setComplete() {
            const payload = { isCompleted: !isCompleted, id };
            const { data } = await apiTodo.setCompleted(payload);

            if (data.status === "success")
                dispatch(actionTodo.setCompleted(payload));
        }

        setComplete();
    };
    return (
        <div
            className={
                isCompleted ? "todo-container completed" : "todo-container"
            }
        >
            <Checkbox
                color="success"
                className="todo-checkBox"
                onClick={handleCheckComplete}
                checked={isCompleted ? true : false}
            ></Checkbox>

            <div>
                <p className="todo-content">{content}</p>
                {dueDate && (
                    <p
                        className={
                            isDueDate ? "todo-date dueDate" : "todo-date"
                        }
                    >
                        {date.toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    );
};

export default TodoItem;
