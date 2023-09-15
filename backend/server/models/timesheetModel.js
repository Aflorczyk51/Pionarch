const mongoose = require("mongoose");

//user schema/model
const newTimesheetSchema = new mongoose.Schema(
  {
    timesheetName: {
      type: String,
      required: true,
      label: "timesheetName",
    },
    projectName: {
      type: String,
      required: false,
      label: "projectprojectName",
    },
    hours: { 
      type: Float,
      required: true,
      label: "hours",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "timesheets" }
);

module.exports = mongoose.model('timesheets', newTimesheetSchema)