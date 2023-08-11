import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { stripePromise } from '../App';




const CartPage = () => {
  const [cart, setCart] = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);

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

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    let newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Function to handle the checkout process using Stripe
  const handleCheckout = async () => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cart }),
      });

    // Handle result of creating checkout session
    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // Handle any errors that might occur during the redirect
      alert(result.error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-start">
        {cart.length === 0 ? (
          <h2 className="text-center my-5">Cart Empty</h2>
        ) : (
          <>
            <Col xs={12}>
              <h2 className="my-3">Your Cart</h2>
            </Col>
            {cart.map((item, index) => (
              <Col sm={6} md={4} lg={3} key={item.id}>
                <CartItem item={item} index={index} removeFromCart={removeFromCart} />
              </Col>
            ))}
            <Col xs={12} className="text-left mt-4">
              <h2>Subtotal: £{subtotal.toFixed(2)}</h2>
              <Button variant="primary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default CartPage;
