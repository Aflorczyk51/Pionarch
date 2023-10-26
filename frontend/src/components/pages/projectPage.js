import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ProjectPage() {
  // Define a state to store the list of projects
  const [projects, setProjects] = useState([]);

  // Fetch the list of projects from your API
  useEffect(() => {
    // Make an API request to fetch the list of projects
    fetch("http://localhost:8081/projects/projects") // Use the actual URL of your projects endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        // Set the fetched projects in the state
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);
  
  return (
    <div>
      <h1>Projects</h1>
      
      {/* Button to create a new project */}
      <Link to="/create-project">
        <Button variant="primary">Create New Project</Button>
      </Link>
      
      {/* Display the list of projects */}
      <div className="project-cards">
        {projects.map((project) => (
          <Card key={project._id} className="project-card">
            <Card.Body>
              <Card.Title>{project.projectName}</Card.Title>
              <Card.Text>{project.projectDescription}</Card.Text>
              {/* Link to the project's detail page */}
              <Link to={`/projects/${project._id}`}>
                <Button variant="primary">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
