const express = require("express");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

const userRouter = express.Router();

// user register
userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body;
    try {
        const user = await userModel.find({ email: email });
        if (user.length > 0) {
            res.send({ "mssg": "User already exist, please login" });
        } else {
            bycrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send(err.message);
                } else {
                    const user = new userModel({
                        name,
                        email,
                        gender,
                        password: hash,
                        age,
                        city,
                        is_married
                    });
                    await user.save();
                    res.send("Resgistration successfull!")
                }
            })
        }
    } catch (error) {
        res.send(error.message)
    }
})

// user login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.find({ email: email });
        if (user.length > 0) {
            bycrypt.compare(password, user[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user[0]._id }, "fullstack");
                    res.send({ "mssg": "User login successfull!", "token": token })
                } else {
                    res.send({ "mssg": "Wrong Credentials." })
                }
            });
        } else {
            res.send({ "mssg": "Wrong Credentials." })
        }
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = { userRouter };