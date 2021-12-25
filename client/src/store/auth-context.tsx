import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import Axios from 'axios';

const AuthContext = React.createContext({
  currentUser: '',
  signUp: (_name: string, _password: string): any => {},
  logIn: (_name: string, _password: string): any => {},
  logOut: (): any => {},
  passwordReset: (email: string): any => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function signUp(name: string, password: string) {
    // return createUserWithEmailAndPassword(auth, email, password);
    Axios.post('http://localhost:4000/register', {
      username: name,
      pwd: password,
    }).then((res) => {
      console.log("res: ", res);
    }).catch((err) => {
      console.log("err: ", err)
    });
  }

  const logIn = (name: string, password: string) => {
    // return signInWithEmailAndPassword(auth, email, password);
    Axios.post('http://localhost:4000/login', {
      username: name,
      pwd: password,
    }).then((res) => {
      console.log("res: ", res);
    }).catch((err) => {
      console.log("err: ", err)
    });
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
