const Router = require("express");
const { check } = require("express-validator");
const { register, login } = require("../services/auth.service");
const router = new Router();

router.post(
  "/register",
  [
    check("email", "Uncorrect email").isEmail(),
    check("username", "Uncorrect username").isLength({ min: 3, max: 12 }),
    check("password", "Uncorrect password").isLength({ min: 3, max: 12 }),
  ],
  register
);

router.post(
  "/login",
  [
    check("password", "Password is empty").notEmpty(),
    check("username", "Username is empty").notEmpty(),
  ],
  login
);

module.exports = router;
