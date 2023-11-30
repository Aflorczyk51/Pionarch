const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const newUserModel = require('../models/userModel');
const { newUserValidation } = require('../models/userValidator');
const { generateAccessToken } = require('../utilities/generateToken');

router.put('/editUser', async (req, res) => {
  try {
    // Validate new user information
    const { error } = newUserValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.errors[0].message });
    }

    // Destructure and extract user information from the request body
    const { userId, username, email, password, firstName, lastName } = req.body;

   

    // Find and update user using stored information
    const updatedUser = await newUserModel.findByIdAndUpdate(
      userId,
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
      },
      { new: true } // Return the modified document instead of the original
    );

    // Check if the user was not found
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Create and send a new access token to the client
    const accessToken = generateAccessToken(
      updatedUser._id,
      email,
      firstName,
      lastName,
      username,
      password
    );

    // Set the Authorization header with the new token
    res.header('Authorization', accessToken).send({ accessToken: accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
