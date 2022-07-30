const router = require("express").Router();
const user = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { forwardUser, checkUser } = require("../middleware/auth");

router.get("/register", forwardUser, async (req, res) => {
  res.render("register");
});

router.post("/auth/register", async (req, res) => {
  const { name, email, username, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(400).json({
      msg: "Passwords do not match",
    });
  }
  const userExists = await user.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new user({
    name,
    email,
    username,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
  try {
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_TOKEN);
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({
      msg: "User Created. Redirecting to Dashboard",
    });
  } catch (e) {
    console.log(e);
    res.render("error");
  }
});

router.get("/login", forwardUser, (req, res) => {
  res.render("login");
});

router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  user
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          msg: "User does not exist",
        });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
          });
          return res.status(200).json({
            msg: "User Logged In. Redirecting to Dashboard",
          });
        } else {
          return res.status(400).json({
            msg: "Incorrect Password",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("error");
    });
});
// TODO: CHANGE WHEN USERPROFILE PAGE IS MADE
router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  req.user = null;
  return res.redirect("/login");
});

router.get("/profile", checkUser, async (req, res) => {
  const user = req.user;
  res.render("profile", { user });
});

module.exports = router;
