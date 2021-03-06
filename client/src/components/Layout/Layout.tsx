import React from 'react';
import { Fragment } from 'react';
import { useAppSelector } from '../../hooks/use-selector';
import classes from './Layout.module.css';

import MainNavigation from './MainNavigation';

const Layout = (props: { children: any }) => {
  const loggedIn: boolean = !!useAppSelector((state) => state.auth.token);

  return (
    <Fragment>
      {loggedIn && <MainNavigation />}
      <main className={loggedIn ? classes.main : ''}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
