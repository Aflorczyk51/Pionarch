const express = require("express");
const router = express.Router();
const z = require("zod");
const bcrypt = require("bcrypt");

const newUserModel = require("../models/userModel");

router.get("/getUserById/:userId", async (req, res) => {
  var userId = req.params.userId; // Get userId from URL params

  newUserModel.findById(userId, function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
    if (user == null) {
      res.status(404).send("userId does not exist.");
    } else {
      return res.json(user);
    }
  });
});


module.exports = router;
