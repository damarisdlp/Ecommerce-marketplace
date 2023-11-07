import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Card, Nav, Form, Dropdown } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import useCustomLayout from 'hooks/useCustomLayout';
import 'react-datepicker/dist/react-datepicker.css';
import { useWindowSize } from 'hooks/useWindowSize';
import { setListView, setData, setNumResults } from 'results/resultsSlice';
import { store } from 'store.js';

const NavContent = () => {
  return (
    <Nav className="flex-column">
      <div className="mb-5">
        <Nav className="px-0 mb-5">
          <CsLineIcons icon="" className="me-2 sw-3" size="17" />
          <span className="align-middle"> </span>
        </Nav>
      </div>
      <div className="mb-2">
        <Nav.Link as={Link} to="/listings" className="px-0 pt-1">
          <CsLineIcons icon="content" className="me-2 sw-3" size="17" />
          <span className="align-middle">My Listings</span>
        </Nav.Link>
      </div>
      <div className="mb-2">
        <Nav.Link as={Link} to="/tasks" className="px-0 pt-1">
          <CsLineIcons icon="check-square" className="me-2 sw-3" size="17" />
          <span className="align-middle">Tasks</span>
        </Nav.Link>
      </div>
      <div className="mb-2">
        <Nav.Link as={Link} to="/calendar" className="px-0 pt-1">
          <CsLineIcons icon="calendar" className="me-2 sw-3" size="17" />
          <span className="align-middle">Calendar</span>
        </Nav.Link>
      </div>
      <div className="mb-2">
        <Nav className="px-0 mb-2">
          <CsLineIcons icon="notification" className="me-2 sw-3" size="17" />
          <span className="align-middle">Notifications</span>
        </Nav>
        <div>
          <Nav.Link as={Link} to="/mailbox" className="px-0 pt-1">
            <i className="me-2 sw-3 d-inline-block" />
            <span className="align-middle">Mailbox</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/chat" className="px-0 pt-1">
            <i className="me-2 sw-3 d-inline-block active" />
            <span className="align-middle">Chat</span>
          </Nav.Link>
        </div>
      </div>
      <div className="mb-2">
        <Nav className="px-0 pt-1 mb-2">
          <CsLineIcons icon="abacus" className="me-2 sw-3" size="17" />
          <span className="align-middle">Order Center</span>
        </Nav>
        <div>
          <Nav.Link as={Link} to="/ordercenter" className="px-0 pt-1">
            <i className="me-2 sw-3 d-inline-block" />
            <span className="align-middle">Orders</span>
          </Nav.Link>
          <Nav.Link className="px-0 pt-1 active">
            <i className="me-2 sw-3 d-inline-block" />
            <span className="align-middle">Invoices</span>
          </Nav.Link>
        </div>
      </div>
      <Nav className="px-0 pt-1 mb-2">
        <CsLineIcons icon="user" className="me-2 sw-3" size="17" />
        <span className="align-middle">My Profile</span>
      </Nav>
      <div>
        <Nav.Link className="px-0 pt-1 active">
          <i className="me-2 sw-3 d-inline-block" />
          <span className="align-middle">Friends</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/contacts" className="px-0 pt-1">
          <i className="me-2 sw-3 d-inline-block" />
          <span className="align-middle">Contacts</span>
        </Nav.Link>
      </div>
      <div className="mb-2">
        <Nav className="px-0 pt-1 mb-2">
          <CsLineIcons icon="activity" className="me-2 sw-3" size="17" />
          <span className="align-middle">My Account</span>
        </Nav>
        <div>
          <Nav.Link as={Link} to="/accountSettings" className="px-0 pt-1">
            <i className="me-2 sw-3 d-inline-block" />
            <span className="align-middle">Settings</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/accountSecurity" className="px-0 pt-1">
            <i className="me-2 sw-3 d-inline-block" />
            <span className="align-middle">Security</span>
          </Nav.Link>
        </div>
        <div className="mb-2">
          <Nav className="px-0 pt-1 mb-2">
            <CsLineIcons icon="credit-card" className="me-2 sw-3" size="17" />
            <span className="align-middle">Payment</span>
          </Nav>
          <div>
            <Nav.Link as={Link} to="/accountBilling" className="px-0 pt-1">
              <i className="me-2 sw-3 d-inline-block" />
              <span className="align-middle">Billing</span>
            </Nav.Link>
            <Nav.Link className="px-0 pt-1 active">
              <i className="me-2 sw-3 d-inline-block active" />
              <span className="align-middle">Tax Info</span>
            </Nav.Link>
          </div>
        </div>
      </div>
    </Nav>
  );
};

const ProfileSettings = () => {
  const title = 'My Profile Details';
  const description = 'My Profile';
  const { currentUser } = useSelector((state) => state.auth);

  const breadcrumbs = [
    { to: '', text: 'Home' },
    { to: 'myprofile', text: 'My Profile' },
  ];

  useCustomLayout({ layout: LAYOUT.Boxed });
  const { width } = useWindowSize();

  const { themeValues } = useSelector((state) => state.settings);
  const lgBreakpoint = parseInt(themeValues.lg.replace('px', ''), 10);

  store.dispatch(setNumResults(12));

  const genderOptions = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Other', label: 'Other' },
    { value: 'None', label: 'None' },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [genderValue, setGenderValue] = useState();

  // eslint-disable-next-line
  const updatedUser = {
    FirstName: ' ',
    lastName: ' ',
    address: {
      street: ' ',
      city: ' ',
      state: ' ',
    },
    birthDate: ' ',
    gender: ' ',
    bio: ' ',
    email: ' ',
    secEmail: ' ',
    phone: ' ',
  };

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch('http://localhost:5002/items/');
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          // eslint-disable-next-line no-alert
          window.alert(message);
          return;
        }
        const responseData = await response.json();
        const userListings = responseData.filter((listing) => listing.lynchpin === currentUser.lynchpin);
        store.dispatch(setData(userListings));
        sessionStorage.setItem('resultsData', JSON.stringify(responseData));
        store.dispatch(setListView('grid'));
      } catch (error) {
        console.error('Error fetching items', error);
      }
    }

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HtmlHead title={title} description={description} />

      <Row>
        {width && width >= lgBreakpoint && (
          <Col xs="auto" className="d-none d-lg-flex">
            <div className="nav flex-column sw-25 mt-n2">
              <NavContent />
            </div>
          </Col>
        )}

        <Col>
          {/* Title and Top Buttons Start */}
          <div className="page-title-container">
            <Row>
              {/* Title Start */}
              <Col>
                <h1 className="mb-2 pb-0 display-4">{title}</h1>
                <BreadcrumbList items={breadcrumbs} />
              </Col>
              {/* Title End */}

              {/* Top Buttons Start */}
              {width && width < lgBreakpoint && (
                <Col xs="12" sm="auto" className="d-flex align-items-start justify-content-end d-block d-lg-none">
                  <Dropdown align="end">
                    <Dropdown.Toggle as={Button} variant="outline-primary" className="btn-icon btn-icon-start btn-icon w-100 w-sm-auto">
                      <CsLineIcons icon="gear" /> <span>Settings </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="sw-25 py-3 px-4">
                      <NavContent />
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              )}

              {/* Top Buttons End */}
            </Row>
          </div>
          {/* Title and Top Buttons End */}

          {/* Public Info Start */}
          <h2 className="small-title">Public Info</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">First Name</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue={currentUser.firstName} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Last Name</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue={currentUser.lastName} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Street</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue={currentUser.address.street} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">City</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue={currentUser.address.city} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">State</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue={currentUser.address.state} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Birthday</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Gender</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Select classNamePrefix="react-select" options={genderOptions} value={genderValue} onChange={setGenderValue} placeholder="" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Bio</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control as="textarea" rows={3} defaultValue={currentUser.bio || ' '} />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" value={currentUser.email} disabled />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Public Info End */}

          {/* Contact Info Start */}
          <h2 className="small-title">Contact Info</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Primary Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" defaultValue={currentUser.email} disabled />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Recovery Email</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="email" defaultValue=" " />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Phone</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Control type="text" defaultValue={currentUser.phone} />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Contact Info End */}

          {/* Profile Images Start */}
          <h2 className="small-title">Profile Images</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Col lg="2" md="3" sm="4">
                    <Form.Label className="col-form-label">Set Displayed Image</Form.Label>
                  </Col>
                  <Col sm="8" md="9" lg="10">
                    <Form.Check type="checkbox" className="mt-2" label="Image 1" id="imageCheckbox1" />
                    <Form.Check type="checkbox" className="mt-2" label="Image 2" id="imageCheckbox2" />
                    <Form.Check type="checkbox" className="mt-2" label="Image 3" id="imageCheckbox3" />
                    <Form.Check type="checkbox" className="mt-2" label="Image 4" id="imageCheckbox4" />
                  </Col>
                </Row>
                <Row className="mt-5">
                  <Col lg="2" md="3" sm="4" />
                  <Col sm="8" md="9" lg="10">
                    <Button variant="outline-primary" className="mb-1">
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Profile Images End */}
        </Col>
      </Row>
      <div className="mb-7" />
    </>
  );
};

export default ProfileSettings;
