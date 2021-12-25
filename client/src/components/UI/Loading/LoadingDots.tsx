import React from 'react';
import classes from './LoadingDots.module.css';

const LoadingDots = () => {
  return (
    <div className='centered-loading-dots'>
      <div className={classes['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingDots;
