const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
const { authenticate } = require("./middleware/auth")
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("Welcome to Post Management System")
})

app.use("/users", userRouter);

app.use(authenticate);

app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.port}`)
})