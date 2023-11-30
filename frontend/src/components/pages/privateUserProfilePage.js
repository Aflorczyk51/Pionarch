import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import Form from "react-bootstrap/Form";
import axios from "axios";
import './AllPage.css';

//link to service
//http://localhost:8096/privateUserProfile

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const PRIMARY_COLOR = "#cc5c99";
  const SECONDARY_COLOR = "#0c0c1f";
  const url = "http://localhost:8081/user/editUser";

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

  // handle logout button
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  if (!user.id) return (
  <div><h4>Log in to view this page.</h4></div>
  )
  const { id, email, username, password } = user;
  return (
    <div class="container">
      <div class="col-md-12 text-center">
        <h1>{user && user.username}</h1>
        <div class="col-md-12 text-center">
          <br />
          <h3>
            Welcome to the Pionarch WebApp,{" "}
            <span className="username"> @{username}</span>
          </h3>
          <br />
          <Button className="me-2" href="/editUserPage">
            Change Info
          </
          Button>
</div>
</div>
</div>
);
};

export default PrivateUserProfile;