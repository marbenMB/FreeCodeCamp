const { Schema, model } = require("mongoose");

const exerciseSchema = Schema({
  userId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
});

const ExerciseModel = model("exercise", exerciseSchema);
module.exports = ExerciseModel;
