import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
//import { Link } from 'react-router-dom';

function CreateProject() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    projectDescription: "",
    viewers: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare the project data to send to the API
    const projectDataToSend = {
      projectName: projectData.projectName,
      projectDescription: projectData.projectDescription,
      viewers: projectData.viewers.split(",").map((viewer) => viewer.trim()), // Split viewers by comma and trim spaces
    };
  
    // Send the projectDataToSend to your API endpoint for creating a new project
    fetch("${process.env.REACT_APP_BACKEND_SERVER_URI}/projects/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectDataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API as needed
        console.log("New project created:", data);
      //Navigate to projects/projects
      }) 
      
      .catch((error) => {
        console.error("Error creating project:", error);
      });
      navigate("/projects")
  };
  

  return (
    <div>
      <h2>Create a New Project</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            name="projectName"
            value={projectData.projectName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            name="projectDescription"
            value={projectData.projectDescription}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="viewers">
          <Form.Label>Viewers (Comma-separated usernames)</Form.Label>
          <Form.Control
            type="text"
            name="viewers"
            value={projectData.viewers}
            onChange={handleChange}
          />
        </Form.Group>
        
      
        <Button variant="primary" type="submit">
          Create Project
        </Button>
       
        
      </Form>
    </div>
  );
}

export default CreateProject;
