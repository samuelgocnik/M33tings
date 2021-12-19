import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../store/auth-context';
import Button from '../UI/Button';
import LoadingDots from '../UI/Loading/LoadingDots';
import DesktopLogo from './../../assets/icons/m33tings-desktop.svg';
import './MainNavigation.css';

const classes = new BEMHelper({
  name: 'header',
});

const MainNavigation = () => {
  const { logOut } = useAuth();

  const history = useHistory();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function logoutHandler() {
    try {
      setError('');
      setIsLoading(true);
      await logOut();
      history.push('/');
    } catch (error) {
      setError('Failed to log out');
    }
    setIsLoading(false);
  }

  return (
    <header {...classes()}>
      <Link to="/">
        <img {...classes('logo')} src={DesktopLogo} alt="main logo" />
      </Link>
      <nav>
        <ul {...classes('links')}>
          <li {...classes('item')}>
            <Link to="/meetings">Meetings</Link>
          </li>
          <li {...classes('item')}>
            <Link to="/profile">Profile</Link>
          </li>
          <li {...classes('item', 'logout')}>
            <Button
              text={'Logout'}
              type="button"
              className=""
              onClick={logoutHandler}
            />
            {isLoading && <LoadingDots />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
