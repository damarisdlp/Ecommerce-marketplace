import React, { useState } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import BreadcrumbList from 'components/breadcrumb-list/BreadcrumbList';

const AccountSettings = () => {
  const title = 'Settings';
  const description = 'Service Provider Settings';

  const breadcrumbs = [
    { to: 'marketplace', text: 'Home' },
    { to: 'myprofile', title: 'My Profile' },
    { to: 'accountSettings', title: 'Settings' },
  ];

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Español', label: 'Español' },
    { value: 'Français', label: 'Français' },
    { value: 'Deutsch', label: 'Deutsch' },
  ];
  const [languageValue, setLanguageValue] = useState(languageOptions[1]);
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

        {/* Email Settings Start */}
        <h2 className="small-title">Email Settings</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form className="d-flex flex-column">
              <div className="mb-3 filled custom-control-container">
                <CsLineIcons icon="shield" />
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" id="securityCheck" defaultChecked />
                  <label className="form-check-label" htmlFor="securityCheck">
                    Security Warnings
                  </label>
                </div>
              </div>
              <div className="mb-3 filled custom-control-container">
                <CsLineIcons icon="money" />
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" id="budgetCheck" defaultChecked />
                  <label className="form-check-label" htmlFor="budgetCheck">
                    NEW Rental Scheduled
                  </label>
                </div>
              </div>
              <div className="mb-3 filled custom-control-container">
                <CsLineIcons icon="dollar" />
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" id="quotaCheck" defaultChecked />
                  <label className="form-check-label" htmlFor="quotaCheck">
                    Promotional Discounts
                  </label>
                </div>
              </div>
              <div className="mb-3 filled custom-control-container">
                <CsLineIcons icon="bell" />
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" id="generalCheck" />
                  <label className="form-check-label" htmlFor="generalCheck">
                    General Notifications
                  </label>
                </div>
              </div>
              <div className="mb-3 filled custom-control-container">
                <CsLineIcons icon="news" />
                <div className="form-check form-switch">
                  <input type="checkbox" className="form-check-input" id="newsletterCheck" />
                  <label className="form-check-label" htmlFor="newsletterCheck">
                    Monthly Newsletter
                  </label>
                </div>
              </div>
            </Form>
            <Button variant="primary">Update</Button>
          </Card.Body>
        </Card>
        {/* Email Settings End */}

        {/* Language Settings Start */}
        <h2 className="small-title">Language Settings</h2>
        <Card>
          <Card.Body>
            <Form className="d-flex flex-column">
              <div className="mb-3 filled">
                <CsLineIcons icon="web" />
                <Select classNamePrefix="react-select" options={languageOptions} value={languageValue} onChange={setLanguageValue} placeholder="Select" />
              </div>
            </Form>
            <Button variant="primary">Update</Button>
          </Card.Body>
        </Card>
        {/* Language Settings End */}
      </Col>
    </>
  );
};

export default AccountSettings;
