import React from 'react';
import Button from 'react-bootstrap/Button';
import './LandingPage.css'; 

const Landingpage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Pionarch</h1>
      
      <Button variant="primary" size="lg" href="/signup" className="landing-button">
        Register
      </Button>
    </div>
  );
};

export default Landingpage;
