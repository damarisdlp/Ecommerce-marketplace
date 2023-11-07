const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('create-checkout-session', async (req, res) => {
    const { totalCost } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
            price_data: {
                currency: 'usd',
                product_data: {
                name: 'Test Product',
                },
                unit_amount: totalCost * 100,
            },
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/checkout/success',
        cancel_url: 'http://localhost:3000/checkout/cancel',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
    });
  

module.exports = router;
