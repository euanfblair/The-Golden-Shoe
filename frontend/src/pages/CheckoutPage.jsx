import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useStripe } from '@stripe/react-stripe-js';

const CheckoutPage = () => {
  const [cart, setCart] = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);
  const stripe = useStripe();

  // Calculate the subtotal whenever the cart changes
  useEffect(() => {
    let newSubtotal = 0;
    for (let item of cart) {
      if (item.selectedSize && item.selectedSize.quantity) {
        newSubtotal += item.price * item.selectedSize.quantity;
      }
    }
    setSubtotal(newSubtotal);
  }, [cart]);

  // Function to handle the checkout process using Stripe
  const handleCheckout = async () => {
    if (!stripe) {
      return; // Stripe.js has not yet loaded.
    }

    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Subtotal',
          },
          unit_amount: subtotal * 100, // Stripe expects prices in cents
        },
        quantity: 1,
      }),
    });
    const session = await response.json();

    // Redirect to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <h2>Your Subtotal: £{subtotal.toFixed(2)}</h2>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default CheckoutPage;
