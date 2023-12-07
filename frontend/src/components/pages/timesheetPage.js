import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function TimesheetPage() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTimesheets(data);
      })
      .catch((error) => {
        console.error("Error fetching timesheets:", error);
      });
  }, []);

  return (
    <div>
      <h1>Timesheets</h1>

      {/* Link to CreateTimesheet page */}
      <Link to="/create-timesheet">
        <Button variant="success">Create New Timesheet</Button> // change color
      </Link>

      <div className="timesheet-cards">
        {timesheets.map((timesheet) => (
          <Card key={timesheet._id} className="timesheet-card">
            <Card.Body>
              <Card.Title>{timesheet.title}</Card.Title>
              <Card.Text>{timesheet.description}</Card.Text>
              <Card.Text>Date: {timesheet.date}</Card.Text>
              <Card.Text>Hours: {timesheet.hours}</Card.Text>
              {/* Add more details as needed */}
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TimesheetPage;
