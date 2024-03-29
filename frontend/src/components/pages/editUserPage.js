import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const EditUserPage = () => {
  const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/editUser`;
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const findFormErrors = () => {
    const { username, email, password } = form;
    const newErrors = {};
    if (username && username.length < 6) newErrors.username = 'Username must be at least 6 characters';
    if (email && !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Input a valid email address';
    if (password && password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    return newErrors;
  };

  const [form, setValues] = useState({
    userId: "",
    username: "",
    email: "",
    password: "",
    favline: "",
  });

  useEffect(() => {
    // Set initial form values using user data
    const userData = getUserInfo();
    setValues({
      userId: userData.id,
      username: userData.username,
      email: userData.email,
      password: "", // You may choose to not fill the password for security reasons
      favline: userData.favline,
    });
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    const { id, value } = input;
    setValues({ ...form, [id]: value });
    if (!!errors[id]) {
      setErrors({
        ...errors,
        [id]: null,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Remove userId from the form data before sending the request
        const { userId, ...formData } = form;
        await axios.post(url, formData);
        navigate("/privateuserprofile");
      } catch (error) {
        if (
          error.response &&
          error.response.status !== 409 &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          window.alert(error.response.data.message);
        }
        if (error.response && error.response.status === 409) {
          setErrors({ username: "Username is taken, pick another" });
        }
      }
    }
  };

  const handleCancel = () => {
    navigate("/privateuserprofile");
  };

  return (
    <div>
      <Card body outline color="success" className="mx-1 my-2" style={{ width: '30rem' }}>
        <Card.Title>Edit User Information</Card.Title>
        <Card.Body>
          <Form>
            {/* Form fields here */}
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
              />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </Form.Group>

            {/* You may choose to add other form fields as needed */}

            <Row>
              <Col>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Save Changes
                </Button>
              </Col>

              <Col>
                <Button variant="primary" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditUserPage;
