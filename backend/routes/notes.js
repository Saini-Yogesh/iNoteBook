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

// ROUTE :3
// Update Notes using PUT:  "/updateNote" login required
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { tittle, description, tag } = req.body;
    // create a newNote object
    const newNote = {};
    if (tittle) {
      newNote.tittle = tittle;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // find the node to be updated and upgate it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE : 4
// delete using DELETE:  "/deleteNode" login required
router.delete("/deleteNode/:id", fetchUser, async (req, res) => {
  try {
    // find the node to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // Allow deletion id only if user owns this notes
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Succes: "note has been deleted", notes: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
