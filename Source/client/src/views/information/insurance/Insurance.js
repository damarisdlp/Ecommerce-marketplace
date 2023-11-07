import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';

const Insurance = () => {
  const title = 'Insurance';
  const description = 'Insurance page';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'insurance', text: 'Insurance' },
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
              <h2> Insurance and Peace of Mind is a large part of why you are transacting with us.</h2>
              <p>Buy Insurance, or else...</p>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Insurance;
