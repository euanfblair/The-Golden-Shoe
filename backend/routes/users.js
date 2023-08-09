const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtToken = process.env.JWT_SECRET;
let User = require('../models/user.model');

// Function to generate a JWT token
function generateToken(user) {
  return jwt.sign({ id: user._id, name: user.name }, jwtToken, { expiresIn: '30d' });
}

// GET request to retrieve all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to register a new user
router.route('/register').post((req, res) => {
  // Extracting user details from request body
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const cart = req.body.cart;

  const newUser = new User({
    name,
    email,
    password,
    address,
    cart,
  });

  newUser.save()
    .then(() => res.json('User registered!'))
    .catch(err => {
      if (err.code === 11000) { // this is the error code for duplicate key
        res.status(400).json('Error: Email already exists!');
      } else {
        res.status(400).json('Error: ' + err);
      }
    });
});

// POST request to login a user
router.route('/login').post(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'No account with this email has been registered.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = generateToken(user);

    res.json({ message: 'Logged in successfully.', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while trying to login.' });
  }
});

module.exports = router; // Export the router
