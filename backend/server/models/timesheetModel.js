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
      type: Number,
      required: true,
      label: "hours",
    },
    date: {
      type: Date,
      default: Date.now,
    }, // Need to either tie UserID to here, or TimesheetID to User
  },
  { collection: "timesheets" }
);

module.exports = mongoose.model('timesheets', newTimesheetSchema)