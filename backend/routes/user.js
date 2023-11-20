const bcrypt = require('bcrypt');

const express = require('express');
const User = require('../models/user');

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
    console.log('existingUser',existingUser)
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.json({ username: newUser.username });
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Login route
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  console.log('username, password',username, password)
    try {
      const user = await User.findOne({ username });
      console.log('user',user)
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
     return res.json({ username: user.username });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;
