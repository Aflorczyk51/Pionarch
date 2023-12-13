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
    viewers: { 
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