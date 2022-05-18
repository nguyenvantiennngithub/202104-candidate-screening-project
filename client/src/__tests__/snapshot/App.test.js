import App from "../../App";
import Provider from "../../store/TodoProvider";
import renderer from "react-test-renderer";

describe("app", () => {
    it("normal case", () => {
        const tree = renderer.create(
            <Provider>
                <App></App>
            </Provider>
        );

        expect(tree.toJSON()).toMatchSnapshot();
    });
});
