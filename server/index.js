import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDB from "./db/mysql.connect.js";
import router from "./routers/index.js";
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    exposedHeaders: "Authorization",
};
console.log(process.env.TZ);

app.use(cors(corsOptions));
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

connectDB();
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
