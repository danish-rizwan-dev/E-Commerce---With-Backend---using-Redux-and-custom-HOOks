import express from "express";
const Router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import executeQuery from "../database/dbHelper.js";
import constants from "../constants.js";

const SALTROUNDS = constants.SALTROUNDS;
const SECRET = constants.SECRET;

Router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const result = await executeQuery("SELECT * FROM users WHERE email = ?", [email]);
        const user = result[0];
        if (user) {
            return res.status(400).send({ message: "User already exists", success: false });
        }
        const hashedPassword = bcrypt.hashSync(password, SALTROUNDS);
        await executeQuery(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );
        res.status(200).send({
            message: "Signup successful! Please log in.", success: true
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).send({ message: "Error registering user", success: false });
    }
});

Router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        let result = await executeQuery(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        const user = result[0];
        console.log("User :", user);
        if (!user) {
            return res.status(400).send({ message: "User Account does not exist " });
        }
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, SECRET);
            return res.status(200).send({
                message: "Login successful",
                token,
                success: true
            });
        } else {
            return res.status(400).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error while login" });
    }
});

export default Router;
