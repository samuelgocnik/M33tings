import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/StartingPage/Auth/PrivateRoute';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/Loading/LoadingSpinner';
import { useAuth } from './store/auth-context';
import PublicRoute from './components/StartingPage/Auth/PublicRoute';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const MeetingsPage = React.lazy(() => import('./pages/MeetingsPage'));
const ForgotPasswordPage = React.lazy(
  () => import('./pages/ForgotPasswordPage')
);

function App() {
  const { currentUser } = useAuth();
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path={'/'} exact>
            {currentUser ? (
              <Redirect to="/meetings" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <PublicRoute path={'/login'} component={LoginPage} />

          <PublicRoute path={'/signup'} component={SignupPage} />

          <PublicRoute
            path={'/forgot-password'}
            component={ForgotPasswordPage}
          />

          <PrivateRoute path={'/profile'} exact component={ProfilePage} />

          <PrivateRoute path={'/meetings'} exact component={MeetingsPage} />

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
