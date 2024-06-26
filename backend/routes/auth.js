const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// creata a user using :POST ".api/auth/" Dosent require auth
router.post(
  "/",
  [
    body("email", "Enter a valid name").isEmail(),
    body("name", "Enter a valid email").isLength({ min: 5 }),
    body("passward", "at least enter 8 character in passward").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      passward: req.body.passward,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "please enter a valid Email", message: err.message });
      });
  }
);

module.exports = router;
