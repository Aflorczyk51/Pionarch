import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function EmployeePage() {
  // Define a state to store the list of employees
  const [employees, setEmployees] = useState([]);

  // Fetch the list of employees from your API
  useEffect(() => {
    // Make an API request to fetch the list of employees
    fetch("http://localhost:8081/user/getAll")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        // Set the fetched employees in the state
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <div>
      <h1>Employees</h1>

      {/* Display the list of employees */}
      <div className="employee-cards">
        {employees.map((employee) => (
          <Card key={employee._id} className="employee-card">
            <Card.Body>
              <Card.Title style={{ textTransform: 'capitalize' }}>{employee.lastName}, {employee.firstName}</Card.Title>
              <Card.Text>{employee.username}</Card.Text>
              <Card.Text>{employee.email}</Card.Text>
              {/* Link to the employee's detail page */}
              <Link to={`/employee/${employee._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EmployeePage;
