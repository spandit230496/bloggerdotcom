const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
    blog: [
      {
        type: mongoose.Types.ObjectId,
        ref: "blog",
        required: true,
      },
    ],
  },
  { timestamps: true }
);
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
