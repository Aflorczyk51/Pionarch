import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "./TimesheetPage.css"

function TimesheetPage() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets/`)
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
    <div className="timesheet-page">
      <h1>Timesheets</h1>

      {/* Link to CreateTimesheet page */}
      <Link to="/create-timesheet">
        <Button variant="primary">Create New Timesheet</Button>
      </Link>

      <div className="timesheet-cards-container">
        <div className="timesheet-cards">
          {timesheets.map((timesheet) => (
            <Card key={timesheet._id} className="timesheet-card">
              <Card.Body>
                <Card.Title>{timesheet.title}</Card.Title>
                <Card.Text>{timesheet.description}</Card.Text>
                <Card.Text>Date: {timesheet.date}</Card.Text>
                <Card.Text>Hours: {timesheet.hours}</Card.Text>
                {/* Use Link to navigate to TimesheetDetails page */}
                <Link to={`/timesheets/${timesheet._id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimesheetPage;
