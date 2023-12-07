import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function CreateTimesheet() {
  const [timesheetData, setTimesheetData] = useState({
    title: "",
    description: "",
    date: "",
    hours: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimesheetData({
      ...timesheetData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare the timesheet data to send to the API
    const timesheetDataToSend = {
      title: timesheetData.title,
      userId: 123,
      projectDescription: timesheetData.description,
      hours: 10,
      date: timesheetData.date, // Assuming date is part of your data
    };
  
    // Send the timesheetDataToSend to your API endpoint for creating a new timesheet
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URI}/timesheets/timesheets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timesheetDataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API as needed
        console.log("New timesheet created:", data);
        // Redirect to the EditTimesheet page with the timesheetId
        navigate(`/timesheets/${data._id}`);
      })
      .catch((error) => {
        console.error("Error creating timesheet:", error);
      });
  };
  

  return (
    <div>
      <h2>Create a New Timesheet</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Timesheet Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={timesheetData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={timesheetData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={timesheetData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
<br></br>
        <Button variant="primary" type="submit">
          Create Timesheet
        </Button>
      </Form>
    </div>
  );
}

export default CreateTimesheet;
