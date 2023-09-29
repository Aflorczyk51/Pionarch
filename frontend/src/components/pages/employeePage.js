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
    fetch("http://localhost:8096/employees") // Use the actual URL of your employees endpoint
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
      
      {/* Button to create a new employee */}
      <Link to="/create-employee">
        <Button variant="primary">Create New Employee</Button>
      </Link>
      
      {/* Display the list of employees */}
      <div className="employee-cards">
        {employees.map((employee) => (
          <Card key={employee.id} className="employee-card">
            <Card.Body>
              <Card.Title>{employee.employeeName}</Card.Title>
              <Card.Text>{employee.employeeDescription}</Card.Text>
              {/* Link to the employee's detail page */}
              <Link to={`/employee/${employee.id}`}>
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
