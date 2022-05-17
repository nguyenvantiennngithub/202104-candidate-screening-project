import TodoForm from "../../component/TodoForm/TodoForm";
import Provider from "../../store/TodoProvider";
import renderer from "react-test-renderer";

describe("todo form", () => {
    function createNodeMock(ele) {
        if (ele.type === "input") {
            return {
                focus() {},
            };
        }
        return null;
    }
    it("normal case", () => {
        const todoForm = renderer.create(
            <Provider>
                <TodoForm></TodoForm>
            </Provider>
        );

        const todoFormTree = todoForm.toJSON();
        expect(todoFormTree).toMatchSnapshot();
    });

    describe("change or click", () => {
        it("onchange value of textarea", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const textAreaEle = await todoForm.root.findByType("textarea");
            renderer.act(() => {
                textAreaEle.props.onChange({ target: { value: "abc" } });
            });

            const todoFormTree = todoForm.toJSON();
            expect(todoFormTree).toMatchSnapshot();
        });

        it("onclick checkbox", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const checkBoxEle = await todoForm.root.findByProps({
                className: "todoForm-checkbox",
            });
            renderer.act(() => {
                checkBoxEle.props.onClick();
            });

            const todoFormTree = todoForm.toJSON();
            expect(todoFormTree).toMatchSnapshot();
        });

        it("onchange due date", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const dueDateEle = await todoForm.root.findByProps({
                id: "datetime-local",
            });
            renderer.act(() => {
                dueDateEle.props.onChange({
                    target: { value: "2022-05-13 06:06:00" },
                });
            });

            const todoFormTree = todoForm.toJSON();
            expect(todoFormTree).toMatchSnapshot();
        });
    });

    describe("add todo", () => {
        it("with content empty", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const dueDateEle = await todoForm.root.findByProps({
                id: "button-submit",
            });
            renderer.act(() => {
                dueDateEle.props.onClick();
            });

            const todoFormTree = todoForm.toJSON();
            expect(todoFormTree).toMatchSnapshot();
        });

        it("with content", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const todoFormTree = todoForm.toJSON();
            const btnSubmitEle = await todoForm.root.findByProps({
                id: "button-submit",
            });
            const textAreaEle = await todoForm.root.findByType("textarea");

            renderer.act(() => {
                textAreaEle.props.onChange({ target: { value: "abc" } });
            });
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => {
                btnSubmitEle.props.onClick();
            });
            expect(todoFormTree).toMatchSnapshot();
        });

        it("with check checkbox, has content, empty date", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );
            const todoFormTree = todoForm.toJSON();

            const textAreaEle = await todoForm.root.findByType("textarea");
            const btnSubmitEle = await todoForm.root.findByProps({
                id: "button-submit",
            });
            const checkBoxEle = await todoForm.root.findByProps({
                className: "todoForm-checkbox",
            });

            renderer.act(() => {
                textAreaEle.props.onChange({ target: { value: "abc" } });
            });
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => {
                checkBoxEle.props.onClick();
            });
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => {
                btnSubmitEle.props.onClick();
            });
            expect(todoFormTree).toMatchSnapshot();
        });

        it("with check checkbox, has content, has date", async () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>,
                { createNodeMock }
            );
            const textAreaEle = await todoForm.root.findByType("textarea");
            const btnSubmitEle = await todoForm.root.findByProps({
                id: "button-submit",
            });
            const checkBoxEle = await todoForm.root.findByProps({
                className: "todoForm-checkbox",
            });
            const dueDateEle = await todoForm.root.findByProps({
                id: "datetime-local",
            });
            const todoFormTree = todoForm.toJSON();

            renderer.act(() => {
                textAreaEle.props.onChange({ target: { value: "abc" } });
            });
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => {
                checkBoxEle.props.onClick();
            });
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => {
                dueDateEle.props.onChange({
                    target: { value: "2022-05-13 06:06:00" },
                });
            });
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => {
                btnSubmitEle.props.onClick();
            });
            expect(todoFormTree).toMatchSnapshot();
        });
    });
});
