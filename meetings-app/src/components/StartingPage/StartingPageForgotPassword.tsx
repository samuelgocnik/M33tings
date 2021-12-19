import React from 'react';
import classes from './StartingPageContent.module.css';
import StartingPageLogo from './StartingPageLogo';
import ForgotPasswordForm from './Auth/ForgotPasswordForm';
import { Link } from 'react-router-dom';

const StartingPageForgotPassword = () => {
  return (
    <div className={classes['home-page']}>
      <StartingPageLogo />
      <ForgotPasswordForm />
      <div className={classes['home-page__link']}>
        <Link to="/signup">Doesn't have an account? Create an account</Link>
      </div>
    </div>
  );
};

export default StartingPageForgotPassword;
