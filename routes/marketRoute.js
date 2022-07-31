const router = require("express").Router();
const { checkUser } = require("../middleware/auth");
const template = require("../models/template");
const user = require("../models/user");
const axios = require("axios");
const { recommendModel } = require("../services/preferences");

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
    res.cookie("modelId", newTemplate._id);
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
router.get("/pref/1", checkUser, async (req, res) => {
  res.render("market/pref/1");
});

router.post("/pref/q1", checkUser, async (req, res) => {
  console.log("hello");
  const prompt = req.body.prompt;
  const userId = req.user["_id"];
  const savedUser = await user.findById(userId);
  let data = JSON.stringify({
    kind: "KeyPhraseExtraction",
    parameters: {
      modelVersion: "latest",
    },
    analysisInput: {
      documents: [
        {
          id: "1",
          language: "en",
          text: prompt,
        },
      ],
    },
  });

  let config = {
    method: "post",
    url: process.env.AZURE_ENDPOINT,
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.AZURE_KEY,
    },
    data: data,
  };
  axios(config)
    .then(async (response) => {
      try {
        console.log(response.data.results.documents[0]);
        for (
          let i = 0;
          i < response.data.results.documents[0]["keyPhrases"].length;
          i++
        ) {
          const newUser = await user.findByIdAndUpdate(userId, {
            $push: {
              preferences: response.data.results.documents[0]["keyPhrases"][i],
            },
          });
        }
        return res.status(200).json({
          msg: "Preferences Updated",
        });
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          msg: "Some Error Occurred",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        msg: "Some Error Occurred",
      });
    });
});

router.get("/pref/2", checkUser, async (req, res) => {
  res.render("market/pref/2");
});

router.post("/pref/q2", checkUser, async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const userId = req.user["_id"];
    const savedUser = await user.findById(userId);
    await user.findByIdAndUpdate(userId, {
      $push: { preferences: prompt },
    });
    return res.status(200).json({
      msg: "Preferences Updated Successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      msg: "Some Error Occurred",
    });
  }
});

router.get("/pref/3", checkUser, async (req, res) => {
  res.render("market/pref/3");
});

router.post("/pref/q3", checkUser, async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const userId = req.user["_id"];
    const savedUser = await user.findById(userId);
    console.log(prompt);
    await user.findByIdAndUpdate(userId, {
      $push: { preferences: prompt },
    });
    return res.status(200).json({
      msg: "Preferences Updated Successfully",
    });
  } catch (e) {
    console.log(e);
    console.log("error");
    return res.status(400).json({
      msg: "Some Error Occurred",
    });
  }
});

router.get("/pref/end", checkUser, async (req, res, next) => {
  const recommendedModel = await recommendModel(req, res, next);
  console.log(recommendedModel);
  res.render("market/pref/end", { recommendedModel });
});
module.exports = router;
