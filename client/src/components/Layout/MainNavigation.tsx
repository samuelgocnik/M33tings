import Axios from 'axios';
import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-dispatch';
import { authActions } from '../../store/auth-slice';
import { messageActions } from '../../store/message-slice';
import API_URL from '../../utils/config';
import Button from '../UI/Button';
import LoadingDots from '../UI/Loading/LoadingDots';
import DesktopLogo from './../../assets/icons/m33tings-desktop.svg';
import './MainNavigation.css';

const classes = new BEMHelper({
  name: 'header',
});

const MainNavigation = () => {
  const { logout } = authActions;
  const { setSuccessfulLogout } = messageActions;
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function logoutHandler() {
    try {
      setIsLoading(true);
      dispatch(logout());
      dispatch(setSuccessfulLogout({ value: true }));
      setIsLoading(false);
      history.push('/login');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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
            {!isLoading && (
              <Button
                text={'Logout'}
                type="button"
                className=""
                onClick={logoutHandler}
              />
            )}
            {isLoading && <LoadingDots />}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
