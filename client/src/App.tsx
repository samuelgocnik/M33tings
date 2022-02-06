import React, { Suspense, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/StartingPage/Auth/PrivateRoute';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/Loading/LoadingSpinner';
import PublicRoute from './components/StartingPage/Auth/PublicRoute';
import Axios from 'axios';
import { authActions } from './store/auth-slice';
import { useAppDispatch } from './hooks/use-dispatch';
import API_URL from './utils/config';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const MeetingsPage = React.lazy(() => import('./pages/MeetingsPage'));
const NewMeetingPage = React.lazy(() => import('./pages/NewMeetingPage'));

function App() {
  const { login } = authActions;
  const dispatch = useAppDispatch();

  const loginHandler = useCallback(async () => {
    await Axios.get(`${API_URL}login`)
      .then((res) => {
        if (res.data.loggedIn) {
          dispatch(login({ user: res.data.user }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [login, dispatch]);

  useEffect(() => {
    loginHandler();
  }, [loginHandler]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path={'/'} exact>
            <Redirect to="/meetings" />
          </Route>
          <PublicRoute path={'/login'} component={LoginPage} />

          <PublicRoute path={'/signup'} component={SignupPage} />

          <PrivateRoute path={'/profile'} exact component={ProfilePage} />

          <PrivateRoute path={'/meetings'} exact component={MeetingsPage} />

          <PrivateRoute
            path={'/new-meeting'}
            exact
            component={NewMeetingPage}
          />

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
