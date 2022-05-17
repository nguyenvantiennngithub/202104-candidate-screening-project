import TodoList from "../../component/TodoList/TodoList";
import Provider from "../../store/TodoProvider";
import renderer from "react-test-renderer";

describe("Todo list", () => {
    it("normal case", () => {
        const todoList = renderer.create(
            <Provider>
                <TodoList></TodoList>
            </Provider>
        );

        const todoListTree = todoList.toJSON();
        expect(todoListTree).toMatchSnapshot();
    });
});
