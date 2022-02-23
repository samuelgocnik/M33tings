import React from 'react';
import classes from './StartingPageContent.module.css';
import SignUpForm from '../Auth/SignUpForm';
import { Link } from 'react-router-dom';
import StartingPageLogo from './Logo';

const StartingPageSignup = () => {
  return (
    <div className={classes['home-page']}>
      <StartingPageLogo />

      <SignUpForm />
      <div className={classes['home-page__link']}>
        <Link to="/login">Already have an account? Log In</Link>
      </div>
    </div>
  );
};

export default StartingPageSignup;
