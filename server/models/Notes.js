// @author Karsten Rabe, Jon Jackson

// This model describes the way tasting notes are stored and associated with Users and Beverages

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Note = new Schema({
  // `body` is of type String
  body: {
    type: String,
    required: "Note body is required!"
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  beverages: {
    type: String,
    required: "The name of the mead is required when submitting a note!"
  }
});

module.exports = mongoose.model("Notes", Note);
