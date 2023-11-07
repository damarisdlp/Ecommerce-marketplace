import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Checkout() {
  const { currentUser } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || '',
    lastName: currentUser.lastName || '',
    email: currentUser.email || '',
    address: currentUser.address.street || '',
    city: currentUser.address.city || '',
    state: currentUser.address.state || '',
    zip: currentUser.address.zip || '',
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowAlert(true);
      console.log('Submitting order:', formData);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>Checkout</h2>
          <hr />
          {showAlert && (
            <Alert variant="warning" onClose={handleCloseAlert} dismissible>
              <Alert.Heading>Processing Order</Alert.Heading>
              <p>Stripe integration still in development. Do not use for official payments.</p>
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} isInvalid={!!errors.firstName} />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} isInvalid={!!errors.lastName} />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" value={formData.address} onChange={handleChange} isInvalid={!!errors.address} />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter your city" value={formData.city} onChange={handleChange} isInvalid={!!errors.city} />
              <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter your state" value={formData.state} onChange={handleChange} isInvalid={!!errors.state} />
              <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="zip">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Enter your zip code" value={formData.zip} onChange={handleChange} isInvalid={!!errors.zip} />
              <Form.Control.Feedback type="invalid">{errors.zip}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
