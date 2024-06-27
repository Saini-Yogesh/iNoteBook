const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");

// ROUTE :1
// fetsh all NOtes using GET:  "/fetchAllNotes" login required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    // Log the error message
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE :2
// Add Notes using POST:  "/addNote" login required
router.post(
  "/addNote",
  fetchUser,
  [
    // validation condition
    body("tittle", "tittle must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // if there are error return bad request and the errors
      const result = validationResult(req);
      // if filr any validation issue
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const { tittle, description, tag } = req.body;
      const note = new Notes({
        tittle,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      // Log the error message
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
