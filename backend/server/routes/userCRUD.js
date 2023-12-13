const express = require("express");
const router = express.Router();
const userModel = require('../models/userModel'); // Import your user model here

// Read/view users
router.get('/users', async (req, res) => {
    try {
        // Retrieve all users
        const users = await userModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: "Error trying to retrieve users" });
    }
});

// Update a user by ID
router.put('/users/:userId', async (req, res) => {
    try {
        // Parse request body to get user data
        const { username, email, role } = req.body;

        // Update the user by ID
        const updatedUser = await userModel.findByIdAndUpdate(
            req.params.userId,
            {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password
            },
            { new: true }
        );

        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: "Error trying to update the user" });
    }
});

// Delete a user by ID
router.delete('/users/:userId', async (req, res) => {
    try {
        // Delete the user by ID
        await userModel.findByIdAndRemove(req.params.userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Error trying to delete the user" });
    }
});

module.exports = router;
