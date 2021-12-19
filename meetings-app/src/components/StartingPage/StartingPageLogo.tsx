import React from 'react';
import classes from './StartingPageContent.module.css';
import DesktopLogo from './../../assets/icons/m33tings-desktop.svg';
import MobileLogo from './../../assets/icons/m33tings-mobile.svg';

const StartingPageLogo = () => {
  return (
    <div className={classes['home-page__logo']}>
      <picture>
        <source media="(min-width:700px)" srcSet={DesktopLogo} />
        <img src={MobileLogo} alt="main logo" />
      </picture>
    </div>
  );
};

export default StartingPageLogo;
