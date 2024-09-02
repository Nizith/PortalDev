const UserModel = require("../models/userModel")
const jwt = require('jsonwebtoken');

const insertUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        if (!username || !password || !role) {
            return res.status(400).send({ message: "username, Password, and Role are required" });
        }
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists!" });
        }
        const user = new UserModel({ username, password, role });
        const data = await user.save();
        res.send({ message: "User added successfully!", data });
    } catch (err) {
        console.error("Error adding user:", err.message);
        res.status(500).send({ message: "An error occurred while creating the user." });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: "User not found!" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid Password!" });
        }

        const tokenPayload = { username: user.username, role: user.role };
        const token = jwt.sign(tokenPayload, 'your_jwt_secret', { expiresIn: '1h' });

        res.send({ message: "Login Successful!", token, role: user.role });
    } catch (err) {
        console.error("Error logging in user:", err.message);
        res.status(500).send({ message: "An error occurred while logging in the user." });
    }
}

module.exports = {
    insertUser,
    loginUser
}