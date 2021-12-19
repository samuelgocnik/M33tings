import React from 'react';
import { Fragment } from 'react';
import { useAuth } from '../../store/auth-context';
import classes from './Layout.module.css';

import MainNavigation from './MainNavigation';


const Layout = (props: { children: any }) => {
  const { currentUser } = useAuth();

  return (
    <Fragment>
      {currentUser && <MainNavigation />}
      <main className={currentUser ? classes.main : ''}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
