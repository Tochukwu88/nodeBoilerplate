const User = require('../models/user');
const jwt = require('jsonwebtoken');

class Auth {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          message: 'all fields required',
        });
      }
      if (name && email && password) {
        return res.status(200).json({
          message: 'succesfull',
        });
      }
      let user = await User.findOne({ email });

      if (user !== null) {
        return res.status(409).json({
          error: 'user already exist',
        });
      }
      let newUser = new User({ name, email, password });
      let person = await newUser.save();
      return res.status(201).json({
        message: 'user created',
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  async login(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    try {
      if (user === null) {
        res.status(404).json({
          error: 'user with that email does not exist',
        });
      }

      if (!user.authenticate(password)) {
        res.status(403).json({
          error: 'email and password does not match',
        });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
        expiresIn: process.env.TOKENVALIDITY,
      });
      const { _id, name, email } = user;
      return res.json({
        token,
        user: {
          _id,
          name,
          email,
        },
      });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  verifyToken(req, res) {
    const authorizationHeaader = req.headers;

    if (authorizationHeaader) {
      const token = authorizationHeaader.authorization.split(' ')[1];

      try {
        jwt.verify(token, process.env.JWTSECRET, {
          expiresIn: process.env.TOKENVALIDITY,
        });
      } catch (err) {
        return res.status(401).json({
          error: err,
        });
      }
    }
  }
}
module.exports = Auth;
