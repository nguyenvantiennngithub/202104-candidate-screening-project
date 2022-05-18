import TodoForm from "../../component/TodoForm/TodoForm";
import Provider from "../../store/TodoProvider";
import renderer from "react-test-renderer";

describe("todo form", () => {
    function createNodeMock(ele) {
        if (ele.type === "input") return { focus() {} };
        return null;
    }
    it("normal case", () => {
        const todoForm = renderer.create(
            <Provider>
                <TodoForm></TodoForm>
            </Provider>
        );
        expect(todoForm.toJSON()).toMatchSnapshot();
    });

    describe("change or click", () => {
        it("onchange value of textarea", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const textAreaEle = todoForm.root.findByType("textarea");
            renderer.act(() =>
                textAreaEle.props.onChange({ target: { value: "abc" } })
            );
            expect(todoForm.toJSON()).toMatchSnapshot();
        });

        it("onclick checkbox", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const checkBoxEle = todoForm.root.findByProps({
                className: "todoForm-checkbox",
            });
            renderer.act(() => checkBoxEle.props.onClick());
            expect(todoForm.toJSON()).toMatchSnapshot();
        });

        it("onchange due date", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const dueDateEle = todoForm.root.findByProps({
                id: "datetime-local",
            });
            renderer.act(() =>
                dueDateEle.props.onChange({
                    target: { value: "2022-05-13 06:06:00" },
                })
            );
            expect(todoForm.toJSON()).toMatchSnapshot();
        });
    });

    describe("add todo", () => {
        it("with content empty", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const dueDateEle = todoForm.root.findByProps({
                id: "button-submit",
            });
            renderer.act(() => dueDateEle.props.onClick());

            expect(todoForm.toJSON()).toMatchSnapshot();
        });

        it("with content", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );

            const todoFormTree = todoForm.toJSON();
            const btnSubmitEle = todoForm.root.findByProps({
                id: "button-submit",
            });
            const textAreaEle = todoForm.root.findByType("textarea");

            renderer.act(() =>
                textAreaEle.props.onChange({ target: { value: "abc" } })
            );
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => btnSubmitEle.props.onClick());
            expect(todoFormTree).toMatchSnapshot();
        });

        it("with check checkbox, has content, empty date", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>
            );
            const todoFormTree = todoForm.toJSON();

            const textAreaEle = todoForm.root.findByType("textarea");
            const btnSubmitEle = todoForm.root.findByProps({
                id: "button-submit",
            });
            const checkBoxEle = todoForm.root.findByProps({
                className: "todoForm-checkbox",
            });

            renderer.act(() =>
                textAreaEle.props.onChange({ target: { value: "abc" } })
            );
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => checkBoxEle.props.onClick());
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => btnSubmitEle.props.onClick());
            expect(todoFormTree).toMatchSnapshot();
        });

        it("with check checkbox, has content, has date", () => {
            const todoForm = renderer.create(
                <Provider>
                    <TodoForm></TodoForm>
                </Provider>,
                { createNodeMock }
            );
            const textAreaEle = todoForm.root.findByType("textarea");
            const btnSubmitEle = todoForm.root.findByProps({
                id: "button-submit",
            });
            const checkBoxEle = todoForm.root.findByProps({
                className: "todoForm-checkbox",
            });
            const dueDateEle = todoForm.root.findByProps({
                id: "datetime-local",
            });
            const todoFormTree = todoForm.toJSON();

            renderer.act(() =>
                textAreaEle.props.onChange({ target: { value: "abc" } })
            );
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => checkBoxEle.props.onClick());
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() =>
                dueDateEle.props.onChange({
                    target: { value: "2022-05-13 06:06:00" },
                })
            );
            expect(todoFormTree).toMatchSnapshot();

            renderer.act(() => btnSubmitEle.props.onClick());
            expect(todoFormTree).toMatchSnapshot();
        });
    });
});
