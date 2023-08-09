const express = require('express');
const router = express.Router();

// hard coded admin user
const admin = { username: 'admin', password: 'admin' };

// POST request - login an admin
router.post('/adminLogin', (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    // Valid admin credentials. Ideally, you would return a signed JWT here
    res.json({ message: 'Admin logged in successfully.' });
  } else {
    // Invalid credentials
    res.status(401).json({ message: 'Invalid username or password.' });
  }
});

module.exports = router;
