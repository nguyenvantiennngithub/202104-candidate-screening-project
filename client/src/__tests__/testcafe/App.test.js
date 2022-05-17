import { Selector } from "testcafe";

fixture`TodoItem`.page`http://localhost:3000/`;

const queryChecked = ".todo-container input[type='checkbox']:checked";
const queryUnChecked = ".todo-container input[type='checkbox']:not(:checked)";
const queryAll = ".todo-container input[type='checkbox']";
const messageContentError = "Can't add task because content is empty";
const messageDueDateError = "Can't add task because due date not set";

test("check the first unCheck checkbox", async (t) => {
    const countChecked = await Selector(queryChecked).count;
    const isExistUnChecked = await Selector(queryUnChecked).exists;
    const countCheck = 1;

    if (isExistUnChecked) {
        const firstCheckboxUnCheck = Selector(queryUnChecked).nth(0);

        await t.click(firstCheckboxUnCheck);
        await t
            .expect(countChecked)
            .eql((await Selector(queryChecked).count) - countCheck);
    } else {
        console.log("add new todo, is not exist uncheck todo to testing");
    }
});

test("Check the second and third checked checkbox", async (t) => {
    const countChecked = await Selector(queryChecked).count;
    const isExistChecked = (await Selector(queryChecked).count) >= 2;
    const countCheck = 2;
    if (isExistChecked) {
        const listUnchecked = Selector(queryChecked);
        const secondCheckboxUnCheck = listUnchecked.nth(1);
        const thirdCheckboxUnCheck = listUnchecked.nth(1);

        await t.click(secondCheckboxUnCheck).click(thirdCheckboxUnCheck);
        await t
            .expect(countChecked)
            .eql((await Selector(queryChecked).count) + countCheck);
    } else {
        console.log("is not exist 2 checked todo to testing");
    }
});

test("check the first and second unCheck checkbox", async (t) => {
    const countChecked = await Selector(queryChecked).count;
    const isExistUnChecked = (await Selector(queryUnChecked).count) >= 2;
    const countCheck = 2;

    if (isExistUnChecked) {
        const firstCheckboxUnCheck = Selector(queryUnChecked).nth(0);
        const secondCheckboxUnCheck = Selector(queryUnChecked).nth(0);

        await t.click(firstCheckboxUnCheck).click(secondCheckboxUnCheck);
        await t
            .expect(countChecked)
            .eql((await Selector(queryChecked).count) - countCheck);
    } else {
        console.log("is not exist 2 uncheck todo to testing");
    }
});

test("create new todo empty content, dont set due date (error)", async (t) => {
    // const textArea = Selector(".todoForm-content-input");
    const btnSubmit = Selector("#button-submit");
    const countTodoList = await Selector(queryAll).count;

    await t.click(btnSubmit);

    await t
        .expect(await Selector(".todoForm-messageError").textContent)
        .eql(messageContentError, "exist message error");
    await t
        .expect(countTodoList)
        .eql(await Selector(queryAll).count, "dont change number of todo");
});

test("create new todo empty due date (error)", async (t) => {
    const textArea = Selector(".todoForm-content-input");
    const btnSubmit = Selector("#button-submit");
    const countTodoList = await Selector(queryAll).count;
    const checkboxSetDueDate = Selector("#checkbox-setDueDate");
    await t
        .typeText(textArea, "Nguyen Van Tien")
        .click(checkboxSetDueDate)
        .click(btnSubmit);

    await t
        .expect(await Selector(".todoForm-messageError").textContent)
        .eql(messageDueDateError);
    await t
        .expect(countTodoList)
        .eql(await Selector(queryAll).count, "dont change number of todo");
});

test("create new todo dont set due date", async (t) => {
    const textArea = Selector(".todoForm-content-input");
    const btnSubmit = Selector("#button-submit");
    const countTodoList = await Selector(queryAll).count;
    await t.typeText(textArea, "Nguyen Van Tien").click(btnSubmit);
    await t
        .expect(countTodoList)
        .eql(
            (await Selector(queryAll).count) - 1,
            "dont change number of todo"
        );
});
test("create new todo with content, due date", async (t) => {
    const textArea = Selector(".todoForm-content-input");
    const btnSubmit = Selector("#button-submit");
    const checkboxSetDueDate = Selector("#checkbox-setDueDate");
    const dueDate = Selector("#datetime-local");
    const countTodoList = await Selector(queryAll).count;
    await t
        .typeText(textArea, "Nguyen Van Tien")
        .click(checkboxSetDueDate)
        .typeText(dueDate, "2013-03-18T13:00")
        .click(btnSubmit);
    await t
        .expect(countTodoList)
        .eql(
            (await Selector(queryAll).count) - 1,
            "dont change number of todo"
        );
});
test("create new todo with content, due date but dont check set due date", async (t) => {
    const textArea = Selector(".todoForm-content-input");
    const btnSubmit = Selector("#button-submit");
    const dueDate = Selector("#datetime-local");
    const countTodoList = await Selector(queryAll).count;
    await t
        .typeText(textArea, "Nguyen Van Tien")
        .typeText(dueDate, "2013-03-18T13:00")
        .click(btnSubmit);
    await t
        .expect(countTodoList)
        .eql(
            (await Selector(queryAll).count) - 1,
            "dont change number of todo"
        );
});
test("clear completed todo", async (t) => {
    const btnClearCompleted = Selector("#clear-completed-todo");

    await t.click(btnClearCompleted);
    await t.expect(await Selector(queryChecked).count).eql(0);
});
