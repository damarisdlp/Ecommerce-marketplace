import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';

const InclusivityGuidelines = () => {
  const title = 'Inclusivity Guidelines';
  const description = 'Guidelines for creating an inclusive and equitable platform';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'inclusivity', text: 'Inclusivity' },
  ];

  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <h1 className="mb-2 pb-0 display-4">{title}</h1>
        <BreadcrumbList items={breadcrumbs} />
      </div>
      {/* Title End */}

      <Row className="g-5">
        <Col xl="8" xxl="9" className="mb-5">
          {/* Content Start */}
          <Card className="d-flex mb-2 flex-grow-1">
            <Card.Body className="pt-0">
              <br />
              <h2>Treat all users with respect regardless of their race, religion, or political affiliation</h2>
              <p>
                When using the platform, please treat all users with respect <b> regardless of their race, religion, or political affiliation. </b>
                Please rely on using factors such as a user's average reviews or how long an account has been on the platform instead of discriminating based on
                race, religion, or political affiliation. Sterotyping users does not help in creating a marketplace that welcomes everyone.
                <b> Please do your best to extend equal courteousy towards all users. </b>
                If you experience discrimination on the platform, please contact us.
              </p>
              <br />
            </Card.Body>
          </Card>
          {/* Content End */}
        </Col>
      </Row>
    </>
  );
};

export default InclusivityGuidelines;
