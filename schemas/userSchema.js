const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const userSchema = new Schema(
  {
    name: reqString,
    email: reqString,
    username: reqString,
    password: reqString,
    credits: {
      type: Number,
      required: true,
    },
    preferences: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
