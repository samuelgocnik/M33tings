import React from 'react';
import classes from './StartingPageContent.module.css';
import LogInForm from '../Auth/LogInForm';
import { Link } from 'react-router-dom';
import StartingPageLogo from './Logo';

const StartingPageLogin = () => {
  return (
    <div className={classes['home-page']}>
      <StartingPageLogo />

      <LogInForm />
      <div className={classes['home-page__link']}>
        <Link to="/signup">Doesn't have an account? Create an account</Link>
      </div>
    </div>
  );
};

export default StartingPageLogin;
