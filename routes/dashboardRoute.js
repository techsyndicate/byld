const express = require("express");
const router = express.Router();
const template = require("../models/template");
const { checkUser } = require("../middleware/auth");

router.get("/", checkUser, async (req, res) => {
  const templates = await template.find({ userId: req.user["_id"] });
  res.render("dashboard/index", { templates });
});

// Model Section
router.post("/model/new", async (req, res) => {
  const { name, description } = req.body;
  const newTemplate = new template({
    name,
    description,
  });
  newTemplate.save();
  res.cookie("modelId", newTemplate._id, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
  });
  return res.redirect("/dashboard/model/pref/1");
});
router.get("/dashboard/model/pref/1", checkUser, async (req, res) => {
  res.render("model/pref/1");
});
module.exports = router;
