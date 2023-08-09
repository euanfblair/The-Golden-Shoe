const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with secret key
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Database Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

// Importing Routes
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');

// Using Routes
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// Stripe Checkout Route
app.post('/create-checkout-session', async (req, res) => {
  const { cartItems } = req.body;

  // Transform cart items for Stripe
  const transformedItems = cartItems
    .filter(item => item.selectedSize && item.selectedSize.quantity >= 1)
    .map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe requires amount in cents
      },
      quantity: item.selectedSize.quantity,
    }));

  // Check if there are valid items in the cart
  if (transformedItems.length === 0) {
    return res.status(400).json({ error: 'No valid items in the cart' });
  }

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: transformedItems,
    mode: 'payment',
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  res.json({ id: session.id });
});

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port: 5000`);
});
