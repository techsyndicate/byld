const router = require("express").Router();

router.get("/register", async (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (!email.includes("@")) {
    return res.status(400).json({
      msg: "Email is not valid",
    });
  }
  if (password !== password2) {
    return res.status(400).json({
      msg: "Passwords do not match",
    });
  }
});

module.exports = router;
