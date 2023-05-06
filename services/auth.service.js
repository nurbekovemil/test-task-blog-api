const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: "Uncorrect user data", errors: errors });
    }

    const { username, email, password } = req.body;
    const candidateEmail = await User.findOne({ email: email });
    const candidateUsername = await User.findOne({ username: username });

    if (candidateEmail) {
      return res
        .status(400)
        .json({ message: `User with email ${email} already exist` });
    }

    if (candidateUsername) {
      return res
        .status(400)
        .json({ message: `User with username ${username} already exist` });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: { email: user.email, username: user.username, id: user._id },
      message: "User was created",
    });
  } catch (e) {
    res.status(500).json({ message: "Registration error" });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Uncorrect login data", errors });
    }
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Uncorrect password" });
    }

    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: "1h",
    });

    return res.json({
      token,
      user: { username: user.username, id: user.id, email: user.email },
    });
  } catch (e) {
    res.status(500).json({ message: "Login error" });
  }
};
module.exports = { register, login };
