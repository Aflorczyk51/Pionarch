import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../../utilities/decodeJwt';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    const userData = getUserInfo();
    if(userData) {
      setEmployeeDetails({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    });
  }
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getUserById/${id}`)
      .then((response) => {
        setEmployeeDetails(response.data);
        setEditedDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee details:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/users/users/${id}`, editedDetails)
      .then((response) => {
        console.log("Employee details updated successfully:", response.data);
        navigate("/employees");
      })
      .catch((error) => {
        console.error("Error updating employee details:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/users/users/${id}`)
        .then(() => {
          console.log("Employee deleted successfully");
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
        });
    }
  };

  return (
    <div>
      <h1>Employee Details</h1>

      {loading ? (
        <p>Loading Employee details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : employeeDetails ? (
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <label>First Name:</label>
              <br />
              <input
                type="text"
                name="firstName"
                value={editedDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Last Name:</label>
              <br />
              <input
                type="text"
                name="lastName"
                value={editedDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label>Email:</label>
            <br />
            <input
              type="text"
              name="email"
              value={editedDetails.email}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={handleDelete} style={{ marginLeft: "10px" }}>
            Delete employee
          </button>
        </form>
      ) : (
        <p>No employee details available.</p>
      )}
    </div>
  );
}

export default EmployeeDetails;
