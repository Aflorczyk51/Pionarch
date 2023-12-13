const mongoose = require("mongoose");

//user schema/model
const newTimesheetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      label: "title",
    },
      userId: {
        type: String,
        required: true,
        label: "userId",
      },
    projectDescription: {
      type: String,
      required: false,
      label: "projectDescription",
    },
    hours: { 
      type: Number,
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