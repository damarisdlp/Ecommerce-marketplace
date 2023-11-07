import React from 'react';
import { Button } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const stripePromise = loadStripe('pk_test_51MqiwOGxXuaF6goAbxPjVWYc1XRE2ZaSB8xnuybhH9qLGPyK5uJLKCbMfmq4jzP9zGoheIJ4Up28OAk06wF4bGNl00kcaMenRV');

const handleClick = async (totalCost) => {
  const stripe = await stripePromise;

  const response = await fetch('http://localhost:5002/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ totalCost }),
  });
  const session = await response.json();

  if (session && session.id) {
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error(result.error.message);
    }
  } else {
    console.error('No session ID', session);
  }
};

const CheckoutButton = ({ totalCost }) => {
  return (
    <Button variant="primary" className="btn-icon btn-icon-end mb-1" role="link" onClick={() => handleClick(totalCost)}>
      <CsLineIcons icon="money" />
      <span> Checkout with Stripe</span>
    </Button>
  );
};

export default CheckoutButton;
