import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Searching for lyrics...</p>
    </div>
  );
}

export default Loading;
