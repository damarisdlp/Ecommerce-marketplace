import { React, useState, useRef } from 'react';
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

const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PN_REGEX = /[+()-. ]?[()-. ]?[()-. ]?(\d{1,3})?[()-. ]?[()-. ]?(\d{3})[-. ()]?[()-. ]?(\d{3})[-. ()]?(\d{4})/;

let users = {};
let newUser = {};
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

// Adds a new user to database
async function addNewUser(values) {
  // gets the current date and formats it
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString();
  const day = currentDate.getDate().toString();
  const year = currentDate.getFullYear().toString();
  const date = month.concat('/').concat(day).concat('/').concat(year);

  // concatanate first and last name
  const fullName = values.firstName.concat(' ').concat(values.lastName);

  // create a unique id for the new user
  const lynchpin = uuidv4();

  // Creates a new user object
  newUser = {
    lynchpin,
    name: fullName,
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    group: 'users',
    position: 'user',
    email: values.email,
    password: values.password,
    phone: values.phone,
    creationDate: date,
    thumb: '/img/default/default_user.png',
    verified: 'Pending',
    rating: 'Unrated',
    address: {
      street: '123 Unknown Pl',
      city: 'Somewhere',
      state: 'Undisclosed',
      zip: '12345',
    },
    profilePics: { 1: 'one', 2: 'two' },
  };

  console.log('newUser: \n', newUser);

  // Sends a post request and adds a new user to the database
  await fetch('http://localhost:5002/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  }).catch((error) => {
    // eslint-disable-next-line
      window.alert(error);
  });
}

const Register = () => {
  const errRef = useRef();

  const [errMsgEmail, setErrMsgEmail] = useState('');
  const [errMsgPN, setErrMsgPN] = useState('');
  const [errMsgPwCx, setErrMsgPwCx] = useState('');
  const [errMsgPwMatch, setErrMsgPwMatch] = useState('');
  const [errMsgPNCorrect, setErrMsgPNCorrect] = useState('');
  const [errMsgUsername, setErrMsgUsername] = useState('');

  const title = 'Register';
  const description = 'Register Page';
  const history = useHistory();

  const profile = {
    pathname: '/myprofile',
    state: { from: 'register' },
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    email: Yup.string().email().required('Email is required'),
    username: Yup.string().min(4, 'Must be at least 4 characters!').required('Username is required'),
    password: Yup.string().min(8, 'Must be at least 8 characters!').required('Password is required'),
    terms: Yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });
  const initialValues = { firstName: '', lastName: '', phoneNumber: '', email: '', password: '', confirmPassword: '', terms: false };

  let emailAvailable = true;
  let phoneNumberAvailable = true;
  let usernameAvailable = true;
  let pwComplex = true;
  let pwMatch = true;
  let phoneNumCorrect = true;

  const onSubmit = (values) => {
    getUsers();
    console.log(users);
    setErrMsgEmail('');
    setErrMsgPN('');
    setErrMsgUsername('');
    setErrMsgPwCx('');
    setErrMsgPwMatch('');
    setErrMsgPNCorrect('');

    console.log('submit form', values);
    // the following will check the password meets the complexity requirements
    pwComplex = PWD_REGEX.test(values.password);
    if (values.password !== values.confirmPassword) {
      pwMatch = false;
    }

    // the following will check the phonenumber is a phonenumber
    phoneNumCorrect = PN_REGEX.test(values.phone);

    // the following will loop through each user to verify the username, email and
    //  phone number have not been registered already
    Object.values(users).forEach((element) => {
      if (values.username === element.username) {
        usernameAvailable = false;
      }
      if (values.email === element.email) {
        emailAvailable = false;
      }
      if (values.phone === element.phone) {
        phoneNumberAvailable = false;
      }
    });

    if (emailAvailable && phoneNumberAvailable && usernameAvailable && pwComplex && pwMatch && phoneNumCorrect) {
      // adds a new user to the database
      addNewUser(values);
      // Set curentUser to newly registered user
      store.dispatch(setCurrentUser(newUser));
      // Set isLogin to true
      store.dispatch(setIsLogInTrue());
      // Redirect the user to the profile page
      history.push(profile);
    } else {
      if (!emailAvailable) {
        setErrMsgEmail('That email is already registered.');
      }
      if (!usernameAvailable) {
        setErrMsgUsername('That username is already registered.');
      }
      if (!phoneNumberAvailable) {
        setErrMsgPN('That phone number is already registered.');
      }
      if (!pwComplex) {
        setErrMsgPwCx('Password does not meet complexity requirements.');
      }
      if (!pwMatch) {
        setErrMsgPwMatch('Passwords do not match');
      }
      if (!phoneNumCorrect) {
        setErrMsgPNCorrect('Phone Number was not entered correctly.');
      }
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
            <h1 className="display-3 text-white">Don't buy, Rent</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">Join the family here to rent your items to others or rent what you need from others.</p>
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
          <h2 className="cta-1 text-primary">let's get the ball rolling!</h2>
        </div>
        <div className="mb-5">
          <p className="h6">Please use the form to register.</p>
          <p className="h6">
            If you are a member, please <NavLink to="/login">login</NavLink>.
          </p>
        </div>
        <div>
          <p style={{ color: 'red' }} ref={errRef} className={errMsgEmail ? 'errmsgEmail' : 'offscreen'}>
            {errMsgEmail}
          </p>
          <p style={{ color: 'red' }} ref={errRef} className={errMsgUsername ? 'errmsgUsername' : 'offscreen'}>
            {errMsgUsername}
          </p>
          <p style={{ color: 'red' }} ref={errRef} className={errMsgPN ? 'errmsgPN' : 'offscreen'}>
            {errMsgPN}
          </p>
          <p style={{ color: 'red' }} ref={errRef} className={errMsgPwCx ? 'errmsgPwCx' : 'offscreen'}>
            {errMsgPwCx}
          </p>
          <p style={{ color: 'red' }} ref={errRef} className={errMsgPwMatch ? 'errmsgPwMatch' : 'offscreen'}>
            {errMsgPwMatch}
          </p>
          <p style={{ color: 'red' }} ref={errRef} className={errMsgPNCorrect ? 'errmsgPNCorrect' : 'offscreen'}>
            {errMsgPNCorrect}
          </p>
        </div>
        <div>
          <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="firstName" placeholder="First Name" value={values.firstName} onChange={handleChange} />
              {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="lastName" placeholder="Last Name" value={values.lastName} onChange={handleChange} />
              {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="phone" />
              <Form.Control type="text" name="phone" placeholder="Phone" value={values.phone} onChange={handleChange} />
              {errors.phone && touched.phone && <div className="d-block invalid-tooltip">{errors.phone}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="user" />
              <Form.Control type="text" name="username" placeholder="Username" value={values.username} onChange={handleChange} />
              {errors.username && touched.username && <div className="d-block invalid-tooltip">{errors.username}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Password" />
              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <div className="form-check">
                <label className="form-check-label">
                  Password must include a minimum of 8 characters, a capital letter, a lowercase letter, a number, and a special charaters !@#$%
                </label>
                {errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
              </div>
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword} placeholder="Confirm Password" />
              {errors.confirmPassword && touched.confirmPassword && <div className="d-block invalid-tooltip">{errors.confirmPassword}</div>}
            </div>
            <div className="mb-3 position-relative form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} value={values.terms} />
                <label className="form-check-label">
                  I have read and accept the{' '}
                  <NavLink to="/" target="_blank">
                    terms and conditions.
                  </NavLink>
                </label>
                {errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
              </div>
            </div>
            <Button size="lg" type="submit">
              Signup
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

export default Register;
