const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Blog", blogSchema);
