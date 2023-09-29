import React from 'react';
import Card from 'react-bootstrap/Card';
import './HomePage.css'; 

function HomePage() {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src="pionarch_logo.png" alt="Logo" className="logo" />
        <span className="webapp-text">PionArch Webapp</span>
      </div>
      <div className="card-container">
        {/* Card for Projects */}
        <a href="/projects" className="card-link">
          <Card style={{ width: '18rem' }} className="mx-2 my-2">
            <Card.Body>
              <Card.Title>Projects</Card.Title>
              <Card.Text>
                Description or content about Projects.
              </Card.Text>
            </Card.Body>
          </Card>
        </a>

        {/* Card for Employees */}
        <a href="/employees" className="card-link">
          <Card style={{ width: '18rem' }} className="mx-2 my-2">
            <Card.Body>
              <Card.Title>Employees</Card.Title>
              <Card.Text>
                Description or content about Employees.
              </Card.Text>
            </Card.Body>
          </Card>
        </a>

        {/* Card for Timesheets */}
        <a href="/timesheets" className="card-link">
          <Card style={{ width: '18rem' }} className="mx-2 my-2">
            <Card.Body>
              <Card.Title>Timesheets</Card.Title>
              <Card.Text>
                Description or content about Timesheets.
              </Card.Text>
            </Card.Body>
          </Card>
        </a>
      </div>
    </div>
  );
}

export default HomePage;
