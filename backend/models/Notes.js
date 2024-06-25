const mongoose = require("mongoose"); // used to import the Mongoose library
import { type } from "os";

const notesSchema = new Schema({ //ˈskiːma
  tittle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: Genral,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", notesSchema);
