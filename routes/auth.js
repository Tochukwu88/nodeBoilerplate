const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth');
let authClass = new Auth();

router.post('/register', authClass.register);
router.post('/login', (req, res) => {
  authClass.login(req, res);
});

module.exports = router;
