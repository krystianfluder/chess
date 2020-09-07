const mongoose = require("mongoose");
const { Schema } = mongoose;

const userNewsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserNewsletter", userNewsletterSchema);
