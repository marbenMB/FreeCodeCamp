const { Schema, model } = require("mongoose");

const userSchema = Schema({
  username: {
    type: String,
    required: [true, "Email Is Required!!"],
  },
});

const UserModel = model("user", userSchema);

module.exports = UserModel;
