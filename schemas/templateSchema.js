const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reqString = { type: String, required: true };

const templateSchema = new Schema(
  {
    name: reqString,
    model: reqString,
    description: reqString,
    preferences: {
      type: Array,
      required: false,
      default: [],
    },
    credits: {
      type: Number,
      required: true,
      default: 30,
    },
  },
  { timestamps: true }
);

const templateModel = mongoose.model("Template", templateSchema);
module.exports = templateModel;
