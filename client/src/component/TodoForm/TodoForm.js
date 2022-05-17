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
    const [dueDate, setDueDate] = useState();
    const [isAlreadySetDueDate, setIsAlreadySetDueDate] = useState(false);
    const [contentMessageError, setContentMessageError] = useState("");
    const [dueDateMessageError, setDueDateMessageError] = useState("");
    const [isCurrentDateIsDueDate, setIsCurrentDateIsDueDate] = useState(false);
    const { dispatch } = useTodo();
    const inputEle = useRef();

    const handleChangeContent = (value) => {
        if (contentMessageError && value.trim() !== "")
            setContentMessageError("");
        setContent(value);
    };

    const handleChangeDueDate = (dateChange) => {
        const now = new Date();
        const dueDate = new Date(dateChange);

        if (dueDateMessageError && dueDate) setDueDateMessageError("");
        setDueDate(dueDate);
        const temp = dueDate.getTime() <= now.getTime();
        setIsCurrentDateIsDueDate(temp);
    };
    const handleClickCheckbox = () => {
        setIsAlreadySetDueDate(!isAlreadySetDueDate);
    };

    const handleAddTask = async () => {
        if (content.trim() === "") {
            setContentMessageError("Can't add task because content is empty");
            return;
        } else if (!dueDate && isAlreadySetDueDate) {
            setDueDateMessageError("Can't add task because due date not set");
            return;
        }
        const { data } = await api.addTodo({
            content,
            dueDate,
            isSetDueDate: isAlreadySetDueDate,
        });
        const { todo, status } = data;
        if (status === "success") {
            setContent("");
            inputEle.current.focus();
            dispatch(addTodo(todo));
        }
    };

    return (
        <div className="todoForm">
            <div className="todoForm-content">
                <div>
                    <textarea
                        value={content}
                        onChange={(e) => {
                            handleChangeContent(e.target.value);
                        }}
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
                        className={
                            isCurrentDateIsDueDate
                                ? "todoForm-date isDueDate"
                                : "todoForm-date"
                        }
                        onChange={(e) => handleChangeDueDate(e.target.value)}
                        disabled={!isAlreadySetDueDate}
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
                        checked={isAlreadySetDueDate ? true : false}
                        id="checkbox-setDueDate"
                    ></Checkbox>
                </div>
            </div>
            <div className="todoForm-action">
                <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={handleAddTask}
                    id="button-submit"
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
