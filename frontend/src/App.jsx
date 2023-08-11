import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Chatbot from './chatbot/ChatbotComponent';
import { UserProvider } from './context/UserContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SuccessCheckoutPage from './pages/SuccessCheckoutPage';




const stripeKey = import.meta.env.VITE_STRIPE_PUB_KEY;
console.log('Stripe Key:', stripeKey);
export const stripePromise = loadStripe(stripeKey);





function App() {
  return (
    <Elements stripe={stripePromise}>
  <UserProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/success" element={<SuccessCheckoutPage />} />
          </Routes>
          <Chatbot />
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
    </Elements>
  );
}

export default App;
