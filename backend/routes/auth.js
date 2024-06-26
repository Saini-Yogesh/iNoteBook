const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "yogeshIsDevlaper";
// creata a user using :POST ".api/auth/createuser" Dosent require auth
router.post(
  "/createuser",
  [
    // validation condition
    body("email", "Enter a valid name").isEmail(),
    body("name", "Enter a valid Name").isLength({ min: 5 }),
    body("password", "at least enter 8 character in   passwords").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // if there are error return bad request and the errors
    const result = validationResult(req);
    // if filr any validation issue
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      // Check whether the user with this same email already exists
      let user = await User.findOne({ email: req.body.email });
      // If exists, then return an error response; else create user
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }
      // Create user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
      // console.log(jwtData);
      // Send response with created user
      // res.json(user);
    } catch (error) {
      // Log the error message
      console.log(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
