import React from 'react';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className="centered-loading-spinner">
      <div className={classes['lds-roller']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
