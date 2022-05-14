import * as constants from "./constants";
const initState = {
    todos: [],
};

const todoReducer = (state, action) => {
    switch (action.type) {
        case constants.addTodo:
            return { ...state, todos: [...state.todos, action.payload] };

        case constants.getAllTodo: {
            return { ...state, todos: action.payload };
        }
        case constants.completedTodo: {
            return {
                ...state,
                todos: state.todos.map((item) => {
                    if (item.id === action.payload.id) {
                        console.log(item.id, item.content);
                        return {
                            ...item,
                            isCompleted: action.payload.isCompleted,
                        };
                    }
                    return item;
                }),
            };
        }

        case constants.clearCompletedTodo: {
            console.log(action.payload);
            return {
                ...state,
                todos: state.todos.filter((item) => {
                    return !action.payload.includes(item.id);
                }),
            };
        }

        default:
            return state;
    }
};

export default todoReducer;
export { initState };
