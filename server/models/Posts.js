const { Schema, model } = require("mongoose");

const Post = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name to the post"],
      unique: true,
    },
    severity: {
      type: String,
      required: [true, "Please provide a severity to the post"],
    },

    description: {
      type: String,
      required: [true, "Please provide a description to the post"],
    },

    complexity: {
      type: String,
      required: [true, "Please provide levelOfSecurity to the post"],
    },
    fixes: {
      type: String,
      required: [true, "Please provide fixes to the post"],
    },
    version: {
      type: String,
      required: [true, "Please provide version to the post"],
    },
    operationSystem: {
      type: String,
      required: [true, "Please provide operationSystem to the post"],
    },
    developer: {
      type: String,
      required: [true, "Please provide developer to the post"],
    },
    platform: {
      type: String,
      required: [true, "Please provide developer to the post"],
    },
    mainId: {
      type: String,
      required: [true, "Please provide mainId to the post"],
      unique: true,
    },
    user: {
      type: String,
      required: [true, "Please provide username to the post"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", Post);
