import db from "./mysql.db.js";
const connectDB = () => {
    db.connect((err) => {
        if (err) {
            console.log("Connect db failure");
            throw err;
        }
        console.log("Connect db successfully");
    });
};
export default connectDB;
