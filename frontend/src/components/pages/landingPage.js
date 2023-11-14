import React from 'react';
import Button from 'react-bootstrap/Button';
import './LandingPage.css';

const Landingpage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Pionarch</h1>

      <div className="landing-buttons">
        <Button variant="primary" size="lg" href="/signup" className="landing-button">
          Register
        </Button>
        <Button variant="outline-primary" size="lg" href="/login" className="landing-button button-space">
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Landingpage;
