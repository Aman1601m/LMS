import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="cssloader">
        <div className="triangle1" />
        <div className="triangle2" />
        <p className="text">Please Wait</p>
      </div>
    </div>
  );
};

export default Loader;
