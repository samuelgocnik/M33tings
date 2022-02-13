import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/Routes/PrivateRoute';
import PublicRoute from './components/Routes/PublicRoute';
import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/Loading/LoadingSpinner';
import Axios from 'axios';
import { authActions } from './store/auth-slice';
import { useAppDispatch } from './hooks/use-dispatch';
import { useAppSelector } from './hooks/use-selector';
import { initializeUser } from './store/auth-actions';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const MeetingsPage = React.lazy(() => import('./pages/MeetingsPage'));
const NewMeetingPage = React.lazy(() => import('./pages/NewMeetingPage'));

function App() {

  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  Axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };

  useEffect(() => {
    dispatch(initializeUser())
    return () => { };
  }, [dispatch]);

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
