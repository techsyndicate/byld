const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const template = new Schema(
  {
    name: reqString,
    model: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    preferences: {
      type: Array,
      required: false,
      default: [],
    },
    credits: {
      type: Number,
      required: false,
      default: 30,
    },
    userId: reqString,
  },
  { timestamps: true }
);

const templateModel = mongoose.model("Template", template);
module.exports = templateModel;
