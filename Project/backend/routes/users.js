const express = require('express');
const router = express.Router();
const User = require('../models/user'); // เปลี่ยน path ให้ตรงกับตำแหน่งของโมเดล

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
