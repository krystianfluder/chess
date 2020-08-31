const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "I am new!",
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetExp: {
      type: String,
      default: null,
    },
    premium: {
      type: String,
      default: null,
    },
    premiumExp: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
