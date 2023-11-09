const express = require("express");
const router = express.Router();
const z = require('zod');
const bcrypt = require("bcrypt");
const newUserModel = require('../models/userModel');
const { newUserValidation } = require('../models/userValidator');
const { generateAccessToken } = require('../utilities/generateToken');

router.post('/editUser', async (req, res) => {
  try {
    // validate new user information
    const { error } = newUserValidation(req.body);
    if (error) return res.status(400).send({ message: error.errors[0].message });

    // store new user information
    const { userId, username, email, password, firstName, lastName } = req.body;

    // check if username is available
    const existingUser = await newUserModel.findOne({ username: username });
    if (existingUser && String(existingUser._id) !== userId) {
      return res.status(409).send({ message: "Username is taken, pick another" });
    }

    // generates the salt
    const saltRounds = 10;

    // generate hash for the password
    const hashPassword = await bcrypt.hash(password, saltRounds);

    // find and update user using stored information
    newUserModel.findByIdAndUpdate(userId, {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashPassword
    }, { new: true }, (err, updatedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      // create and send new access token to the client
      const accessToken = generateAccessToken(updatedUser._id, email, username, hashPassword);
      res.header('Authorization', accessToken).send({ accessToken: accessToken });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
