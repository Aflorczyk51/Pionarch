// Import necessary modules
const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel');

// Route to create a new user
router.post("/users", async (req, res) => {
  try {
    // Extract user data from the request body
    const { firstName, lastName, email } = req.body;

    // Perform any additional validation if needed

    // Create a new user instance
    const newUser = new newUserModel({
      firstName,
      lastName,
      email,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Send a success response with the saved user data
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle the error and send an appropriate response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
