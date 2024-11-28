const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');
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

// New function to fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, 'username role password'); // Fetching specific fields
        res.send(users);
    } catch (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).send({ message: "An error occurred while fetching users." });
    }
};


const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error deleting user:", err.message);
        res.status(500).send({ message: "An error occurred while deleting the user" });
    }
};



// New function to update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, role } = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(
            id,
            { username, role },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (err) {
        console.error("Error updating user:", err.message);
        res.status(500).send({ message: "An error occurred while updating the user" });
    }
};

const resetPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error resetting password:", err.message);
        res.status(500).send({ message: "An error occurred while resetting the password" });
    }
};

module.exports = {
    insertUser,
    loginUser,
    getAllUsers,
    deleteUser,
    updateUser, // Export the new function
    resetPassword // Export the new function
};