const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");

const JWT_SECRET = "yogeshIsDevlaper";

// ROUTE 1:------------------------------------------------------------------------------------------------------
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
      return res.status(400).json({ errors: result.array() });
      // return res.send({ errors: result.array() });
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
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2:------------------------------------------------------------------------------------------------------
// login a user using :POST ".api/auth/login" Dosent require auth
router.post(
  "/login",
  [
    // validation condition
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are error return bad request and the errors
    const result = validationResult(req);
    // if filr any validation issue
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
      // return res.send({ errors: result.array() });
    }
    // destructuring
    const { email, password } = req.body;
    try {
      // fatching user from data base
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      // Checking Password
      const passworsCompair = await bcrypt.compare(password, user.password);
      if (!passworsCompair) {
        return res.json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      // giving a id to user
      const data = {
        user: {
          id: user.id,
        },
      };
      // sending a token to user
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      // Log the error message
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3:------------------------------------------------------------------------------------------------------
// Get Logedin details using :POST ".api/auth/getuser". Login Requir
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // Log the error message
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
