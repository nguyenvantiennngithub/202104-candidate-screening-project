import * as constants from "./constants";

const addTodo = (payload) => {
    return {
        type: constants.addTodo,
        payload: payload,
    };
};

const getAllTodo = (payload) => {
    return {
        type: constants.getAllTodo,
        payload: payload,
    };
};

const setCompleted = (payload) => {
    return {
        type: constants.completedTodo,
        payload: payload,
    };
};

const clearCompleted = (payload) => {
    return {
        type: constants.clearCompletedTodo,
        payload: payload,
    };
};

export { addTodo, getAllTodo, setCompleted, clearCompleted };
