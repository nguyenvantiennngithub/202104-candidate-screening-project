import TodoItem from "../../component/TodoItem/TodoItem";
import Provider from "../../store/TodoProvider";
import renderer from "react-test-renderer";

describe("todo item", () => {
    it("props data normal case", () => {
        const todoItem = renderer.create(
            <Provider>
                <TodoItem
                    data={{
                        content: "Hello",
                        id: 1,
                        isCompleted: 0,
                        dueDate: "2022-05-13 08:52:00",
                    }}
                ></TodoItem>
            </Provider>
        );
        expect(todoItem.toJSON()).toMatchSnapshot();
    });
    // it("props data is empty", () => {
    //     const todoItem = renderer.create(
    //         <Provider>
    //             <TodoItem data={{}}></TodoItem>
    //         </Provider>
    //     );
    //     expect(todoItem.toJSON()).toMatchSnapshot();
    // });
    it("props data is undefined", () => {
        const todoItem = renderer.create(
            <Provider>
                <TodoItem></TodoItem>
            </Provider>
        );

        expect(todoItem.toJSON()).toMatchSnapshot();
    });
    it("props data.id is undefined", () => {
        const todoItem = renderer.create(
            <Provider>
                <TodoItem
                    data={{ id: undefined, content: "hello", isCompleted: 1 }}
                ></TodoItem>
            </Provider>
        );
        expect(todoItem.toJSON()).toMatchSnapshot();
    });
});
