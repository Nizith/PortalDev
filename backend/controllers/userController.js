const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    getAllUsers,
    deleteUser,
    updateUser, // Export the new function
    resetPassword // Export the new function
};