const { Schema, model } = require("mongoose");

const Post = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name to the post"],
    unique: true,
  },
  danger: {
    type: String,
    required: [true, "Please provide a name to the post"],
  },

  description: {
    type: String,
    required: [true, "Please provide a description to the post"],
  },

  complexity: {
    type: String,
    required: [true, "Please provide levelOfSecurity to the post"],
  },
  links: {
    type: String,
    required: [true, "Please provide link to the post"],
  },
  mainId: {
    type: String,
    required: [true, "Please provide link to the post"],
    unique: true,
  },
  user: {
    type: String,
    required: [true, "Please provide username to the post"],
  },
});

module.exports = model("Post", Post);
