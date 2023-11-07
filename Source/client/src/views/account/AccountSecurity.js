import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';

const AccountSecurity = () => {
  const title = 'Security';
  const description = 'Account Security page';
  const { currentUser } = useSelector((state) => state.auth);

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'myprofile', title: 'My Profile' },
    { to: 'accountSecurity', title: 'Security' },
  ];

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Col>
        {/* Title Start */}
        <div className="page-title-container mb-3">
          <Row>
            <Col xs="auto" className="mb-2 mb-md-0 me-auto">
              <div className="w-auto sw-md-30">
                <h1 className="mb-2 pb-0 display-4">{title} </h1>
                <BreadcrumbList items={breadcrumbs} />
              </div>
            </Col>
          </Row>
        </div>
        {/* Title End */}

        {/* Secure Your Account Start */}
        <h2 className="small-title">Secure Your Account</h2>
        <Row className="row-cols-1 row-cols-xl-2 g-2 mb-5">
          <Col>
            <Card>
              <Badge bg="outline-primary" className="me-1 position-absolute s-3 t-3 z-index-1">
                <CsLineIcons icon="check" size="15" />
              </Badge>
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-email.webp" className="theme-filter" alt="email icon" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading mb-2 d-inline-block">
                      Secondary Email Address
                    </NavLink>
                    <p>
                      <span className="text-small text-muted">ACTIVE ADDRESS</span>
                      <br />
                      {currentUser.email}
                    </p>
                    <Button variant="outline-primary" className="btn-icon btn-icon-start mt-1">
                      <CsLineIcons icon="edit-square" /> <span>Edit</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Badge bg="outline-primary" className="me-1 position-absolute s-3 t-3 z-index-1">
                <CsLineIcons icon="check" size="15" />
              </Badge>
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/access-token.webp" className="theme-filter" alt="email icon" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading mb-2 d-inline-block">
                      Two-factor Authentication
                    </NavLink>
                    <p>
                      <span className="text-small text-muted">ACTIVE NUMBER</span>
                      <br />
                      {currentUser.phone}
                    </p>
                    <Button variant="outline-primary" className="btn-icon btn-icon-start mt-1">
                      <CsLineIcons icon="edit-square" /> <span>Edit</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Badge bg="outline-separator" className="me-1 position-absolute s-3 t-3 z-index-1">
                <CsLineIcons icon="check" size="15" />
              </Badge>
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-accounts.webp" className="theme-filter" alt="email icon" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading mb-2 d-inline-block">
                      Security Questions
                    </NavLink>
                    <p>Add Text Here.</p>
                    <Button variant="outline-primary" className="btn-icon btn-icon-start mt-1">
                      <CsLineIcons icon="chevron-right" /> <span>Enable</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Badge bg="outline-separator" className="me-1 position-absolute s-3 t-3 z-index-1">
                <CsLineIcons icon="check" size="15" />
              </Badge>
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-phone.webp" className="theme-filter" alt="email icon" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading mb-2 d-inline-block">
                      Sign in via Phone
                    </NavLink>
                    <p>Add Text Here.</p>
                    <Button variant="outline-primary" className="btn-icon btn-icon-start mt-1">
                      <CsLineIcons icon="chevron-right" /> <span>Enable</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Secure Your Account End */}
      </Col>
    </>
  );
};

export default AccountSecurity;
