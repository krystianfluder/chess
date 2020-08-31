const mongoose = require("mongoose");
const { Schema } = mongoose;

const RefreshTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    useragent: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
