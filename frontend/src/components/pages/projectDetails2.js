import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams(); // Update projectId to _id

  // Define state to store the project details and loading/error states
  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project details based on the _id
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Make an API request to fetch project details using the _id
    fetch(`http://localhost:8081/projects/projects/${id}`) // Update projectId to _id
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((data) => {
        setProjectDetails(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]); 

  return (
    <div>
      <h1>Project Details</h1>
      
      {loading ? (
        <p>Loading project details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : projectDetails ? (
        <div>
          <h2>{projectDetails.projectName}</h2>
          <p>{projectDetails.projectDescription}</p>
          <h3>Users with Access:</h3>
          <ul>
            {projectDetails.viewers.map((viewer, index) => (
              <li key={index}>{viewer}</li>
            ))}
          </ul>
          {/* Display other project details here */}
        </div>
      ) : (
        <p>No project details available.</p>
      )}
    </div>
  );
}

export default ProjectDetails;
