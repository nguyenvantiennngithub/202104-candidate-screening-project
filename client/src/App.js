import "./App.css";
import TodoList from "./component/TodoList/TodoList";
import TodoForm from "./component/TodoForm/TodoForm";
import { useEffect } from "react";
import { useTodo } from "./store/hooks";
import * as todoAction from "./store/todoAction";
import * as todoApi from "./api/todo";
const App = () => {
    const { dispatch } = useTodo();
    useEffect(() => {
        async function getAllTodo() {
            const { data } = await todoApi.getAllTodo();
            dispatch(todoAction.getAllTodo(data.todos));
        }
        getAllTodo();
    }, [dispatch]);
    return (
        <div className="app">
            <div className="container">
                <TodoList></TodoList>
                <TodoForm></TodoForm>
            </div>
        </div>
    );
};

export default App;
