const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
