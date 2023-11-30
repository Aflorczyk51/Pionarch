import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./RegisterPage.css"

const url = "http://localhost:8081/user/signup";
const Register = () => {
  const [data, setData] = useState({ username: "", firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [light, setLight] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {
    // Additional logic can be added here if needed
  }, [light]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      //store token in localStorage
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <section className="vh-100 register-container">
        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <h1>Pionarch WebApp</h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  onChange={handleChange}
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="firstName"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="lastName"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Label>(min. 8 characters)</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Form.Group>
              {error && <div className="pt-3">{error}</div>}
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                className="mt-2"
              >
                Register
              </Button>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
