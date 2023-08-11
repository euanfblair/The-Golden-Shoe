import React from 'react';
import '../Styles/PostCheckout.css';

const SuccessCheckoutPage = () => {
  return (
    <div className="thankyou-container">
      <h1>Thank You!</h1>
      <p>Your order has been successfully processed. We appreciate your business and hope you enjoy your purchase!</p>
      <button className="continue-shopping-btn">Continue Shopping</button>
    </div>
  );
};

export default SuccessCheckoutPage;