import db from "../db/mysql.db.js";

function addTodo(content, dueDate, isSetDueDate) {
    return new Promise(async (res, rej) => {
        let sql = "";
        if (isSetDueDate)
            sql = `insert into todo (content, dueDate) values ('${content}', '${dueDate}')`;
        else sql = `insert into todo (content) values ('${content}')`;
        try {
            db.query(sql, function (err, results) {
                if (!results) return res(0);
                return res(results.insertId);
            });
        } catch (error) {
            console.log("ERROR Add todo", error);
        }
    });
}

function getTodoById(idTask) {
    return new Promise(async (res, rej) => {
        let sql =
            "select id, content, isCompleted, dueDate, created_at" +
            ` from todo where id= ${idTask}`;

        try {
            db.query(sql, function (err, results) {
                if (!results || results.length === 0) return res(null);
                return res(results[0]);
            });
        } catch (error) {
            console.log("ERROR getTodoById", error);
        }
    });
}

function getAllTodo() {
    return new Promise(async (res, rej) => {
        let sql =
            "select id, content, isCompleted, dueDate, created_at" +
            ` from todo where isClear=0`;

        try {
            db.query(sql, function (err, results) {
                if (!results || results.length === 0) return res([]);
                return res(results);
            });
        } catch (error) {
            console.log("ERROR getTodoById", error);
        }
    });
}

function setCompletedTodo(id, isCompleted) {
    return new Promise(async (res, rej) => {
        let sql = `update todo set isCompleted=${isCompleted} where id=${id}`;

        try {
            db.query(sql, function (err, results) {
                if (!results) return res(false);
                return res(results.affectedRows > 0);
            });
        } catch (error) {
            console.log("ERROR getTodoById", error);
        }
    });
}

function clearCompletedTodo(listCompletedId) {
    return new Promise(async (res, rej) => {
        let sql = `update todo set isClear=1 where id in (${listCompletedId})`;

        try {
            db.query(sql, function (err, results) {
                if (!results) return res(false);
                res(results.affectedRows > 0);
            });
        } catch (error) {
            console.log("ERROR getTodoById", error);
        }
    });
}

export {
    addTodo,
    getTodoById,
    getAllTodo,
    setCompletedTodo,
    clearCompletedTodo,
};
