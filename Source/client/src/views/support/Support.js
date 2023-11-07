import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';

const Support = () => {
  const title = 'Support';
  const description = 'Support page';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'support', text: 'Support' },
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
        <Col xl="8" xxl="12" className="mb-5">
          {/* Content Start */}
          <h2>Help and Contact</h2>
          <br />
          <div>
            <Card key="community-resources" className="d-flex mb-4 flex-grow-1">
              <Card.Body className="pt-0">
                <br />
                <h2 className="mb-5">General Resources</h2>
                <NavLink className="mb-5" to="/faq">
                  Frequently Asked Questions
                </NavLink>
                <br className="mb-3" />
                <NavLink to="/chat">Chat with Our Support Team</NavLink>
                <br className="mb-3" />
                <NavLink to="/supportTicketsDetail">Open a Support Ticket</NavLink>
                <br className="mb-3" />
                <NavLink to="/mailbox">Email Our Support Team</NavLink>
                <br className="mb-3" />
              </Card.Body>
            </Card>
          </div>
          <div>
            <Card key="community-resources" className="d-flex mb-4 flex-grow-1">
              <Card.Body className="pt-0">
                <br />
                <h2>Renter Resources</h2>
                <p>Reach out to your fellow 2LetItGo'ers</p>
              </Card.Body>
            </Card>
          </div>
          <div>
            <Card key="community-resources" className="d-flex mt-2 mb-4 flex-grow-1">
              <Card.Body className="pt-0">
                <br />
                <h2>Lister Resources</h2>
                <p>Reach out to your fellow 2LetItGo'ers</p>
              </Card.Body>
            </Card>
          </div>
          {/* Content End */}
        </Col>
      </Row>
    </>
  );
};

export default Support;
