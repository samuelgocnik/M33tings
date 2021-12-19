import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext({
  currentUser: '',
  signUp: (_email: string, _password: string): any => {},
  logIn: (_email: string, _password: string): any => {},
  logOut: (): any => {},
  passwordReset: (email: string): any => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const passwordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const contextValue = {
    currentUser,
    signUp,
    logIn,
    logOut,
    passwordReset,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
