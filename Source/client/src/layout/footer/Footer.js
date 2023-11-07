import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from '@mui/material/Link';

const Footer = () => {
  useEffect(() => {
    document.documentElement.setAttribute('data-footer', 'true');
    return () => {
      document.documentElement.removeAttribute('data-footer');
    };
  }, []);

  return (
    <footer>
      <div className="footer-content">
        <Container>
          <Row>
            {/* Company column */}
            <Col xs="12" sm="3">
              <p className="mb-4 text-muted text-medium">Company</p>
              <ul>
                <Link underline="hover" color="inherit" href="/about">
                  About Us
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/careers">
                  Careers
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/events">
                  Events
                </Link>
              </ul>
            </Col>
            {/* Support column */}
            <Col xs="12" sm="3">
              <p className="mb-4 text-muted text-medium">Support</p>
              <ul>
                <Link underline="hover" color="inherit" href="/insurance">
                  Insurance
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/contact">
                  Contact Us
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/faq">
                  FAQ's
                </Link>
              </ul>
            </Col>
            {/* Products column */}
            <Col xs="12" sm="3">
              <p className="mb-4 text-muted text-medium">Product</p>
              <ul>
                <Link underline="hover" color="inherit" href="/testimonials">
                  Testimonials
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/howItWorks">
                  How It Works
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/membership">
                  Membership
                </Link>
              </ul>
            </Col>
            {/* Information column */}
            <Col xs="12" sm="3">
              <p className="mb-4 text-muted text-medium">Information</p>
              <ul>
                <Link underline="hover" color="inherit" href="/securityGuidelines">
                  Security
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/inclusivity">
                  Inclusivity
                </Link>
                <br />
                <Link underline="hover" color="inherit" href="/termsConditions">
                  Terms & Conditions
                </Link>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
