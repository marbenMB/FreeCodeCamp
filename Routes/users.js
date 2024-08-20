const router = require("express").Router();
const {
  createNewUser,
  getAllUsers,
  getUserById,
} = require("../Controllers/user.controller");
const {
  createNewExercise,
  getExercisesByUserId,
} = require("../Controllers/exercise.controller");

const errHandler = (err, res) => {
  console.log(err);
  res.json({ error: "Document Not Saved!!!!" });
};

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    const list = users.map((user) => {
      return { username: user.username, _id: user._id };
    });
    res.status(200).json(list);
  } catch (err) {
    errHandler(err, res);
  }
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  try {
    const newUser = await createNewUser({ username });
    res.status(201).json({ username: newUser.username, _id: newUser._id });
  } catch (err) {
    errHandler(err, res);
  }
});

router.post("/:id/exercises", async (req, res) => {
  const { id } = req.params;
  let { description, duration, date } = req.body;

  date = date ? new Date(date) : undefined;

  try {
    const newEx = await createNewExercise({
      userId: id,
      description,
      duration,
      date,
    });
    const user = await getUserById(id);
    res.json({
      _id: id,
      username: user.username,
      date: new Date(newEx.date).toDateString(),
      duration: newEx.duration,
      description,
    });
  } catch (err) {
    errHandler(err, res);
  }
});

const setFilters = (params, queries) => {
  const { _id } = params;
  const { from, to } = queries;
  const filter = { userId: _id };

  if (from !== undefined && to !== undefined) {
    filter.date = {
      $gte: new Date(from).getTime().toString(),
      $lte: new Date(to).getTime().toString(),
    };
  }

  return filter;
};

router.get("/:_id/logs", async (req, res) => {
  const id = req.params._id;
  const { limit } = req.query;
  const filter = setFilters(req.params, req.query);
  console.log(filter);
  try {
    const user = await getUserById(id);
    const exercises = await getExercisesByUserId(filter, limit);
    const logs = exercises.map((exer) => {
      return {
        description: exer.description,
        duration: exer.duration,
        date: new Date(exer.date).toDateString(),
      };
    });
    res.status(200).json({
      username: user.username,
      _id: user._id,
      count: logs.length,
      log: logs,
    });
  } catch (err) {
    errHandler(err, res);
  }
});

module.exports = router;
