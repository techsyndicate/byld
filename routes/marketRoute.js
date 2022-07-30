const router = require("express").Router();
const { checkUser } = require("../middleware/auth");
const template = require("../schemas/templateSchema");
const user = require("../schemas/userSchema");

router.get("/", checkUser, (req, res) => {
  console.log(req.user);
  res.render("market/index");
});

router.post("/buy", checkUser, async (req, res) => {
  try {
    const { modelType, modelName } = req.body;
    let modelLink = "";
    if (modelType === "house") {
      // DUMMY LINK TO BE REPLACED WITH ACTUAL MODEL KA GDRIVE LINK
      modelLink = "https://google.com";
    }
    const userId = req.user["_id"];
    const savedUser = await user.findById(userId);
    const credits = savedUser.credits;
    if (credits < 30) {
      return res.status(400).json({
        msg: "Not enough credits",
      });
    } else {
      const newUser = await user.findByIdAndUpdate(userId, {
        $inc: { credits: -30 },
      });
    }

    const newTemplate = new template({
      model: modelLink,
      name: modelName,
      userId,
      credits: 30,
    });
    await newTemplate.save();

    return res.status(200).send({
      msg: "Model purchased",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).status({
      msg: "Some Error Occurred",
    });
  }
});

router.post("/credit", checkUser, async (req, res) => {
  try {
    const credit = req.body.credit;
    const userId = req.user["_id"];
    const savedUser = await user.findByIdAndUpdate(userId, {
      $inc: { credits: credit },
    });
    await savedUser.save();
    return res.status(200).json({
      msg: "Credits Successfully Update",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      msg: "Some Error Occurred",
    });
  }
});

router.post("q1", checkUser, async (req, res) => {
  const prompt = req.body.prompt;
  const userId = req.user["_id"];
  const savedUser = await user.findById(userId);
});
module.exports = router;
