import axios from "axios";
const URL = "http://localhost:8080/api/todo";

const addTodo = (payload) => axios.post(`${URL}/addTodo/`, payload);
const getAllTodo = () => axios.get(`${URL}/getAll`);

const setCompleted = (payload) =>
    axios.patch(`${URL}/setCompleted/${payload.id}`, payload);

const clearCompleted = (payload) =>
    axios.patch(`${URL}/clearCompleted`, payload);

export { addTodo, getAllTodo, setCompleted, clearCompleted };
