import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function EditTimesheet() {
  // Assume your timesheet data structure includes a unique identifier (e.g., timesheetId)
  const { id } = useParams();

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
    // Fetch timesheet data when the component mounts
    const fetchTimesheet = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets/${id}`);
        const timesheetData = response.data; // Adjust this based on your actual API response structure
        setDailyHours(timesheetData); // Update state with timesheet data
      } catch (error) {
        console.error("Error fetching timesheet data:", error);
        // Handle error as needed
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

  // Add any necessary logic for interacting with the days (e.g., saving changes)

  return (
    <div>
      <h2>Edit Timesheet for Week</h2>

      {/* Display days and input fields */}
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

      {/* Add a button to save changes or perform other actions */}
      <Button variant="primary">Save Changes</Button>
    </div>
  );
}

export default EditTimesheet;
