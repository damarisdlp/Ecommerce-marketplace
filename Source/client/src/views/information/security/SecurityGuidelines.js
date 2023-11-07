import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';

const SecurityGuidelines = () => {
  const title = 'Security Guidelines';
  const description = 'Guidelines for remaining safe on the platform';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'security', text: 'Security' },
  ];

  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <h1 className="mb-2 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>

      <Row className="g-5">
        <Col xl="8" xxl="9" className="mb-5">
          <Card className="d-flex mb-2 flex-grow-1">
            <Card.Body className="pt-0">
              <br />
              <h2> Be informed of who you are transacting with.</h2>
              <p>
                When transacting with others on the platform, make sure to check for symbols of trust.
                <br />
                Look for items on their profile page such the age of an account.
                <br />
                The platform will assist in identifying users who have been verified for more than 30 days.
                <br />
              </p>
              <h2> Watch out for users asking to financially transact outside the platform.</h2>
              <p>
                Watch out for people asking to pay off platform.
                <br />
                Please use the messaging center for more secure messaging.
                <br />
                Avoid communicating off the marketplace platform to increase safety.
                <br />
                The marketplace provides a centralized payments and messaging platform designed to provide mutual trust and security.
                <br />
                Common examples of off-platform payment solicitations:
                <br />
                Venmo, Cash App, Zelle, Paypal and requests to wire money.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SecurityGuidelines;
