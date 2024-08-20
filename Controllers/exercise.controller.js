const ExerciseModel = require("../Models/Exercise.model");

const createNewExercise = async (exercise) => {
  return await ExerciseModel.create(exercise);
};

const getExercisesByUserId = async (filter, limit) => {
  let query = ExerciseModel.find(filter).sort({ date: 1 });

  if (limit) {
    query = query.limit(+limit);
  }
  return await query.exec();
};

module.exports = { createNewExercise, getExercisesByUserId };
