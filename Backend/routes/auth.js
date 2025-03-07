const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {

    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    console.log( error.message);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router; 