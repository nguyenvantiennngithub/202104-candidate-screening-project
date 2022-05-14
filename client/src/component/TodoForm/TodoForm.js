import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { addTodo } from "../../store/todoAction";
import { useTodo } from "../../store/hooks";
import * as api from "../../api/todo";
import "./TodoForm.css";
import { Checkbox } from "@mui/material";

const TodoForm = () => {
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [isSetDueDate, setIsSetDueDate] = useState(false);
    const [contentMessageError, setContentMessageError] = useState("");
    const [dueDateMessageError, setDueDateMessageError] = useState("");
    const { dispatch } = useTodo();
    const dateTimeEle = useRef();
    const inputEle = useRef();

    const handleChangeContent = (e) => {
        if (contentMessageError && e.target.value.trim() !== "")
            setContentMessageError("");
        setContent(e.target.value);
    };

    const handleChangeDate = (e) => {
        const now = new Date();
        const dueDate = new Date(e.target.value);

        if (dueDateMessageError && dueDate) setDueDateMessageError("");
        setDueDate(dueDate);
        if (dueDate.getTime() <= now.getTime()) {
            dateTimeEle.current.classList.add("isDueDate");
        } else {
            dateTimeEle.current.classList.remove("isDueDate");
        }
    };
    const handleClickCheckbox = () => {
        setIsSetDueDate(!isSetDueDate);
    };

    const handleAddTask = async () => {
        if (content.trim() === "") {
            setContentMessageError("Can't add task because content is empty");
            return;
        } else if (!dueDate && isSetDueDate) {
            setDueDateMessageError("Can't add task because due date not set");
            return;
        }
        const { data } = await api.addTodo({
            content,
            dueDate,
            isSetDueDate,
        });
        const { todo, status } = data;
        if (status === "success") {
            dispatch(addTodo(todo));
            setContent("");
            inputEle.current.focus();
        }
    };

    return (
        <div className="todoForm">
            <div className="todoForm-content">
                <div>
                    <textarea
                        value={content}
                        onChange={handleChangeContent}
                        className="todoForm-content-input"
                        placeholder="Enter content"
                        ref={inputEle}
                    />
                </div>
                <div className="todoForm-addion">
                    <TextField
                        id="datetime-local"
                        label="Due date"
                        type="datetime-local"
                        defaultValue={null}
                        className="todoForm-date"
                        onChange={handleChangeDate}
                        disabled={!isSetDueDate}
                        ref={dateTimeEle}
                        sx={{
                            width: 250,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Checkbox
                        color="success"
                        className="todoForm-checkbox"
                        onClick={handleClickCheckbox}
                        checked={isSetDueDate ? true : false}
                    ></Checkbox>
                </div>
            </div>
            <div className="todoForm-action">
                <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={handleAddTask}
                >
                    Add
                </Button>
                {contentMessageError && (
                    <span className="todoForm-messageError">
                        {contentMessageError}
                    </span>
                )}
                {dueDateMessageError && (
                    <span className="todoForm-messageError">
                        {dueDateMessageError}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TodoForm;
