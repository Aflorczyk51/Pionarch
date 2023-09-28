const mongoose = require("mongoose");

//user schema/model
const newProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      label: "projectName",
    },
    projectDescription: {
      type: String,
      required: false,
      label: "projectDescription",
    },
    viewers: { // Needs to be thought about. It's possible to list the projects that a user can see under the user collection, or here. Which is gonna be less messy?
      type: [String], 
      required: true,
      label: "projectName",
    }, 
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "projects" }
);

module.exports = mongoose.model('projects', newProjectSchema)