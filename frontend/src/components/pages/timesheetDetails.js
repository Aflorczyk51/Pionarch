// EditTimesheet.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function EditTimesheet() {
  // Assume your timesheet data structure includes a unique identifier (e.g., timesheetId)
  const { timesheetId } = useParams();

  const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/:timesheetId`;

  // Use state to manage the interaction with each day
  const [dailyHours, setDailyHours] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

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
