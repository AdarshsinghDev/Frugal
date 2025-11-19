import React from 'react';
import '../styles/SuccessMessage.css';

const SuccessMessage = ({ name }) => {
  return (
    <div className="success-message-container">
      <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="success-content">
        <p className="success-title">Registration successful!</p>
        <p className="success-subtitle">Welcome aboard, {name}!</p>
      </div>
    </div>
  );
};

export default SuccessMessage;