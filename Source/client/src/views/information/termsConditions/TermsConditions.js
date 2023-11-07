import React from 'react';
import { Button, Card, Col, Row, Accordion, useAccordionButton } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';
import useCustomLayout from 'hooks/useCustomLayout';

function CustomAccordionToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {});
  return (
    <Card.Body className="py-4" onClick={decoratedOnClick} role="button">
      <Button variant="link" className="list-item-heading p-0">
        {children}
      </Button>
    </Card.Body>
  );
}

const TermsConditions = () => {
  const title = 'Terms and Conditions';
  const description = 'Terms and Conditions page';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'support', text: 'Support' },
    { to: 'termsConditions', text: 'Terms and Conditions' },
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
              <h2>
                <strong> Our Terms and Conditions of Service.</strong>
              </h2>
            </Card.Body>
          </Card>
          <Accordion className="mb-n2" defaultActiveKey="1">
            <Card className="d-flex mb-2 flex-grow-1">
              <CustomAccordionToggle eventKey="1">Terms</CustomAccordionToggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body className="pt-0">
                  <p>
                    <strong>When transacting with others on the platform, thou shall be a becon of trust.</strong>
                  </p>
                  <p>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                    single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                    proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                    haven't heard of them accusamus labore sustainable VHS.
                  </p>
                  <br />
                  <p>
                    <strong>Be the Change You Would Like to See in the World</strong>
                  </p>
                  <p>
                    Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
                    helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft
                    beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    <br />
                    <br />
                    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore
                    sustainable VHS. Ad vegan excepteur butcher vice lomo. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee
                    nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan
                    excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of
                    them accusamus labore sustainable VHS.
                  </p>
                  <p className="mb-0">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                    single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                    proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                    haven't heard of them accusamus labore sustainable VHS.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="d-flex mb-2 flex-grow-1">
              <CustomAccordionToggle eventKey="2">Conditions</CustomAccordionToggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body className="pt-0">
                  <p>
                    <strong>Please use the messaging center for more secure messaging.</strong>
                  </p>
                  <p className="mb-0">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                    single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                    proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                    haven't heard of them accusamus labore sustainable VHS.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card className="d-flex mb-2 flex-grow-1">
              <CustomAccordionToggle eventKey="3">Our Commitment to You</CustomAccordionToggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body className="pt-0">
                  <p>
                    <strong>What We Do</strong>
                  </p>
                  <p className="mb-0">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
                    skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid
                    single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
                    proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably
                    haven't heard of them accusamus labore sustainable VHS.
                  </p>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          {/* Content End */}
        </Col>
      </Row>
      <div className="mb-7" />
    </>
  );
};

export default TermsConditions;
