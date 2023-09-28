const express = require("express");
const router = express.Router();
const timesheetModel = require('../models/timesheetModel'); // Import your timesheet model here

// Create a new timesheet
router.post('/timesheets', async (req, res) => {
    try {
        // Parse request body to get timesheet data
        const { employeeId, date, hoursWorked } = req.body;

        // Create a new timesheet
        const newTimesheet = new timesheetModel({
            employeeId: employeeId,
            date: date,
            hoursWorked: hoursWorked
        });

        // Save the new timesheet
        const savedTimesheet = await newTimesheet.save();
        res.status(201).send(savedTimesheet);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create a new timesheet" });
    }
});

// Read/view timesheets
router.get('/timesheets', async (req, res) => {
    try {
        // Retrieve all timesheets
        const timesheets = await timesheetModel.find();
        res.send(timesheets);
    } catch (error) {
        res.status(500).send({ message: "Error trying to retrieve timesheets" });
    }
});

// Update a timesheet by ID
router.put('/timesheets/:timesheetId', async (req, res) => {
    try {
        // Parse request body to get timesheet data
        const { date, hoursWorked } = req.body;

        // Update the timesheet by ID
        const updatedTimesheet = await timesheetModel.findByIdAndUpdate(
            req.params.timesheetId,
            {
                date: date,
                hoursWorked: hoursWorked
            },
            { new: true }
        );

        res.send(updatedTimesheet);
    } catch (error) {
        res.status(500).send({ message: "Error trying to update the timesheet" });
    }
});

// Delete a timesheet by ID
router.delete('/timesheets/:timesheetId', async (req, res) => {
    try {
        // Delete the timesheet by ID
        await timesheetModel.findByIdAndRemove(req.params.timesheetId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Error trying to delete the timesheet" });
    }
});

module.exports = router;
