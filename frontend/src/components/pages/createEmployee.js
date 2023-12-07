import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = ({ currentTarget: input }) => {
    setFormData({ ...formData, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/users`, formData);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Redirect to the EmployeePage after successful creation
      navigate("/employees");
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("Error creating employee");
    }
  };

  return (
    <div>
      <h1>Create Employee</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "10px" }}>
          <div>
            <label>First Name:</label>
            <br />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <br />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
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
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit">
          Create Employee
        </Button>
      </form>
      {error && (
        <div className="pt-3">
          {error}
        </div>
      )}
      <Link to="/employees">
        <Button variant="primary" className="mt-2">
          Back to Employees
        </Button>
      </Link>
    </div>
  );
};

export default CreateEmployee;
