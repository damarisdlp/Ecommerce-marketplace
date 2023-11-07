import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';

const Membership = () => {
  const title = 'Membership';
  const description = 'Membership page';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'membership', text: 'Membership' },
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
              <h2> You Can Become a Member too.</h2>
              <p>When transacting with others on the platform, your membership is not only a symbols of trust...</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Membership;
