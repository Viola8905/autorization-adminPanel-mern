const { Schema, model } = require("mongoose");

const Notification = new Schema(
  {
    content: {
      type: String,
    },
    postId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = new Schema({
  username: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  platform: {
    type: String,
    default: "windows",
  },
  notifications: [{ type: Notification }],
});

module.exports = model("User", User);
