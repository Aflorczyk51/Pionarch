import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './ProjectDetails.css';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectDetails, setProjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    projectName: "",
    projectDescription: "",
    viewers: [],
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch project details
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/projects/projects/${id}`)
      .then((response) => {
        setProjectDetails(response.data);
        setEditedDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching project details:", error);
        setError(error.message);
        setLoading(false);
      });

    // Fetch the list of users
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getAll`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        viewers: [...prevDetails.viewers, value],
      }));
    } else {
      setEditedDetails((prevDetails) => ({
        ...prevDetails,
        viewers: prevDetails.viewers.filter((viewer) => viewer !== value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/projects/projects/${id}`, editedDetails)
      .then((response) => {
        console.log("Project details updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating project details:", error);
      });
  };

  const handleDelete = () => {
    // Add a confirmation prompt before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/projects/projects/${id}`)
        .then(() => {
          console.log("Project deleted successfully");
          navigate("/projects")
        })
        .catch((error) => {
          console.error("Error deleting project:", error);
        });
    }
  };

  return (
    <div>
      <h1>Project Details</h1>

      {loading ? (
        <p>Loading project details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : projectDetails ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Project Name:</label>
            <br />
            <input
              type="text"
              name="projectName"
              value={editedDetails.projectName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <br />
            <label>Project Description:</label>
            <br />
            <textarea
              name="projectDescription"
              value={editedDetails.projectDescription}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <h3>Users with Access:</h3>
          <h5>Select users from the list:</h5>
          <select
            multiple
            value={editedDetails.viewers}
            onChange={handleCheckboxChange}
          >
            {users.map((user) => (
              <option key={user._id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete Project
          </button>
        </form>
      ) : (
        <p>No project details available.</p>
      )}
    </div>
  );
}

export default ProjectDetails;
