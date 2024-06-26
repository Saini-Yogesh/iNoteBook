const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

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
    // if ther are error return bad request and the errors
    const result = validationResult(req);
    // if filr any validation issue
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    try {
      // check ehether the user with this same email exist alrady
      let user = await User.findOne({ email: req.body.email });
      // if Exist then return exist else create user
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this emial alrady exist" });
      }
      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // res is use,json file
      res.json(user);
    } catch {
      console.log(error.massage);
      res.status(500).sen("Some eror");
    }
  }
);

module.exports = router;
