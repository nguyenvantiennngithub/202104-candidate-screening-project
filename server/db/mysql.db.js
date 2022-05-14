import mysql from "mysql";
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT || "4306",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "todolist",
});

export default db;
