import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import './AllPage.css';

const PrivateUserProfile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  if (!user.id) return (
    <div><h4>Log in to view this page.</h4></div>
  );

  const { firstName } = user;

  return (
    <div class="container">
      <div class="col-md-12 text-center">
        <h1>{user && user.firstName}</h1>
        <div class="col-md-12 text-center">
          <br />
          <h3>
            Welcome to the Pionarch WebApp,{" "}
            <span className="firstName"> {firstName}</span>
          </h3>
          <br />
          {/* Use Link to navigate to EditUserPage */}
          <Link to="/editUserPage">
            <Button className="me-2">
              Change Info
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivateUserProfile;
