import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PublicRoute from "./components/Routes/PublicRoute";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import LoadingSpinner from "./components/UI/Loading/LoadingSpinner";
import Axios from "axios";
import { useAppDispatch } from "./hooks/use-dispatch";
import { useAppSelector } from "./hooks/use-selector";
import { initializeUser } from "./store/auth-actions";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const MeetingsPage = React.lazy(() => import("./pages/MeetingsPage"));
const NewMeetingPage = React.lazy(() => import("./pages/NewMeetingPage"));

function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  Axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  const loggedIn: boolean = !!useAppSelector((state) => state.auth.token);
  const location = useLocation();

  useEffect(() => {
    dispatch(initializeUser());
    return () => {};
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <TransitionGroup component={null}>
          <CSSTransition
            classNames="page-fade"
            timeout={2000}
            key={location.key}
            unmountOnExit
            mountOnEnter
          >
            <Routes location={location}>
              <Route path={"/"} element={<Navigate to="/meetings" />} />

              <Route
                path="login"
                element={
                  <PublicRoute isAllowed={!loggedIn}>
                    <LoginPage />
                  </PublicRoute>
                }
              />

              <Route
                path="signup"
                element={
                  <PublicRoute isAllowed={!loggedIn}>
                    <SignupPage />
                  </PublicRoute>
                }
              />

              <Route
                path="profile"
                element={
                  <ProtectedRoute isAllowed={loggedIn}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="meetings"
                element={
                  <ProtectedRoute isAllowed={loggedIn}>
                    <MeetingsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new-meeting"
                element={
                  <ProtectedRoute isAllowed={loggedIn}>
                    <NewMeetingPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </Suspense>
    </Layout>
  );
}

export default App;
