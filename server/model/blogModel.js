const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "title is required"],
    },
    image: {
      type: String,
      required: [true, "title is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", BlogSchema);

module.exports = blogModel;
