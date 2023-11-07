import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { setCurrentUser, setIsLogInTrue } from 'auth/authSlice';
import { store } from 'store.js';

let users = {};
// get all users from database
async function getUsers() {
  try {
    const response = await fetch('http://localhost:5002/users/');

    if (!response.ok) {
      console.log('response not ok');
      const message = `An error occurred: ${response.statusText}`;
      // eslint-disable-next-line
      window.alert(message);
      return;
    }
    users = await response.json();
  } catch (error) {
    console.error('Error fetching users', error);
  }
}

const Login = () => {
  // get all users from the database
  getUsers();

  // Get auth state at page load
  const title = 'Login';
  const description = 'Login Page';
  const history = useHistory();

  // Where the user will be redirected after successful login - else
  const messages = {
    pathname: '/messages',
    state: { from: 'login' },
  };

  // Vailidate email and password criteria
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });
  const initialValues = { email: '', password: '' };

  // variable to change when user is authenticated
  let authenticate = false;
  // Submit button pressed
  const onSubmit = (values) => {
    // Itterate through imported JSON array of registered users
    users.forEach((element) => {
      // Match email address and password
      if (values.email === element.email && values.password === element.password) {
        // set authenticate to true
        authenticate = true;
        // Set isLogin to true
        store.dispatch(setIsLogInTrue());
        // Set curentUser to logged in user
        store.dispatch(setCurrentUser(element));

        // create a unique session Id for the user
        const sessionId = uuidv4();
        // Store the user's session in session storage
        sessionStorage.setItem('sessionId', sessionId);
        sessionStorage.setItem('currentUser', JSON.stringify(element));
        sessionStorage.setItem('userLoggedIn', 'true');

        // To retrieve the session for later use:
        // const sessionId = sessionStorage.getItem('sessionId');
        // const user = JSON.parse(sessionStorage.getItem('currentUser'));

        // Redirect the user and record to browser history
        history.push(messages);
      }
    });
    if (!authenticate) {
      // Not login success :(
      console.log('Email and password did not match a registered user.');
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">2LetItGo!</h1>
            <h1 className="display-3 text-white">Don't buy, Rent!</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">Welcome to 2LetItGo!</p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white">
              <NavLink text="white" variant="outline-white" to="/marketplace">
                Learn More
              </NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="sh-11">
          <NavLink to="/">
            <div className="logo-default" />
          </NavLink>
        </div>
        <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">Sign in!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use your credentials to login.</p>
          <p className="h6">
            If you are not a member, please <NavLink to="/register">register</NavLink>.
          </p>
        </div>
        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              <NavLink className="text-small position-absolute t-3 e-3" to="/forgot-password">
                Forgot?
              </NavLink>
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <Button size="lg" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
