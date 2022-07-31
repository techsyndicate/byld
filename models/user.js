const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const user = new Schema(
  {
    name: reqString,
    email: reqString,
    username: reqString,
    password: reqString,
    credits: {
      type: Number,
      required: true,
      default: 0,
    },
    preferences: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", user);
module.exports = userModel;
