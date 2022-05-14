import { useReducer } from "react";
import TodoContext from "./TodoContext";
import todoReducer, { initState } from "./todoReducer";

const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(todoReducer, initState);
    return (
        <TodoContext.Provider value={[state, dispatch]}>
            {children}
        </TodoContext.Provider>
    );
};
export default Provider;
