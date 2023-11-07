import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { setIsLogInFalse } from 'auth/authSlice';
import { store } from 'store.js';

// Logs the current user out
const loggingOut = (history) => {
  // Clears the user's data from session storage
  sessionStorage.removeItem('sessionId', 'currentUser');
  sessionStorage.setItem('userLoggedIn', 'false');
  // Set isLogin to false and clears currentUser in auth slice
  store.dispatch(setIsLogInFalse());
  // Redirect the user to '/marketplace'
  history.push('/marketplace');
  return 'logging you out...';
};

// eslint-disable-next-line
const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    loggingOut(history);
  }, [history]);

  return <h3>Logging you out...</h3>;
};

export default Logout;
