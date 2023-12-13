const mongoose = require("mongoose");

//user schema/model
const newUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      label: "username",
    },
    lastName: {
      type: String,
      required: true,
      label: "lastName",
    },
    firstName: {
      type: String,
      required: true,
      label: "firstName",
    },
    email: {
      type: String,
      required: true,
      label: "email",
    },
    password: {
      required: true,
      type: String,
      min : 8
    },
    role: {
      type: String,
      required: false,
      label: "role", // Figure out where to put 0 = admin, 1 = employee, 2 = client
    },
    date: {
      type: Date,
      required: false,
      label: "date"
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model('users', newUserSchema)