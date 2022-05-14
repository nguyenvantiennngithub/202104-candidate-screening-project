import { useContext } from "react";
import TodoContext from "./TodoContext";

const useTodo = () => {
    const [state, dispatch] = useContext(TodoContext);
    return { state, dispatch };
};

export { useTodo };
