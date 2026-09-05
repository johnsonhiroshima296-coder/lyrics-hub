import React, { useState, useEffect } from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-container">
      <div className="error-message">
        <span>⚠️ {message}</span>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
    </div>
  );
}

export default ErrorMessage;
