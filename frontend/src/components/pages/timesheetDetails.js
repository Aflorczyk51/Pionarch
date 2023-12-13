import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function EditTimesheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dailyHours, setDailyHours] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  useEffect(() => {
    const fetchTimesheet = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets/${id}`);
        const timesheetData = response.data; 
        setDailyHours(timesheetData);
      } catch (error) {
        console.error("Error fetching timesheet data:", error);
      }
    };

    fetchTimesheet();
  }, [id]);

  const handleHoursChange = (day, hours) => {
    setDailyHours({
      ...dailyHours,
      [day]: hours,
    });
  };

  const handleSaveChanges = async () => {
    try {
      // Calculate the total hours
      const totalHours = Object.values(dailyHours).reduce((acc, curr) => acc + parseFloat(curr), 0);

      // Send a PUT request to update the timesheet with the new daily hours and total hours
      await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets/${id}`, {
        ...dailyHours,
        hours: totalHours,
      });
      console.log("Changes saved successfully!");
      navigate("/timesheets")
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  const handleDeleteTimesheet = async () => {
    try {
      // Send a DELETE request to remove the timesheet
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets/${id}`);
      console.log("Timesheet deleted successfully!");
      navigate("/timesheets")
      // Redirect to a different page or handle the deletion completion as needed
    } catch (error) {
      console.error("Error deleting timesheet:", error);
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <h2>Edit Timesheet for Week</h2>
      
      {Object.keys(dailyHours).map((day) => (
        <div key={day}>
          <p>{day}</p>
          <input
            type="number"
            value={dailyHours[day]}
            onChange={(e) => handleHoursChange(day, e.target.value)}
          />
        </div>
      ))}

      <Button variant="primary" type="submit" onClick={handleSaveChanges}>
  Save Changes
      </Button>


      <Button variant="primary" onClick={handleDeleteTimesheet}>
        Delete Timesheet
      </Button>
    </div>
  );
}

export default EditTimesheet;
