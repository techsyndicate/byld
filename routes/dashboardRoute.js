const express = require("express");
const router = express.Router();
const template = require("../schemas/templateSchema");
const { checkUser } = require("../services/auth");

router.get("/", checkUser, async (req, res) => {
  const templates = await template.find();
  res.render("dashboard/index", { templates });
});

module.exports = router;
