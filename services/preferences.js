const user = require("../models/user");
const template = require("../models/template");

module.exports = {
  recommendModel: async (req, res, next) => {
    console.log(req.user);
    const userId = req.user["_id"];

    const savedUser = await user.findById(userId);
    let preferences = savedUser["preferences"];
    let budget = preferences[-1];
    let size = preferences[-2];
    let pref = 0;
    console.log("Preferences ", preferences);
    for (let i = 0; i < preferences.length - 2; i++) {
      if (preferences[i].includes("old")) {
        pref += 1;
      }
      if (preferences[i].includes("small")) {
        pref += 1;
      }
      if (preferences[i].includes("simple")) {
        pref += 1;
      }
      if (preferences[i].includes("big")) {
        pref += 3;
      }
      if (preferences[i].includes("modern")) {
        console.log("modern");
        pref += 3.5;
      }
      if (preferences[i].includes("suburban")) {
        pref += 4.5;
      }
      if (preferences[i].includes("modern")) {
        pref += 3;
      }
      if (preferences[i].includes("large")) {
        pref += 3;
      }
      if (preferences[i].includes("traditional")) {
        pref += 1;
      }
    }
    console.log(pref);
    if (pref < 3) {
      const modelId = req.cookies.modelId;
      console.log("model 1");
      let modelLink =
        "https://drive.google.com/file/d/1R6ypLV0LcQln-8nDV-XXqJYJo7QQaXYh/view?usp=sharing";
      let modelName = "Old is Gold";
      const model = await template.findByIdAndUpdate(modelId, {
        $set: { model: modelLink },
        $inc: { credits: 30 },
      });
      if (savedUser.credits < 30) {
        res.render("market/nocredits");
      }
      return { modelLink, modelName, model, credits: model.credits };
    } else if (pref >= 3 && pref <= 4) {
      const modelId = req.cookies.modelId;
      console.log("model 2");
      let modelLink =
        "https://drive.google.com/file/d/1SL3tvIJpAj69qrG91V0HXfo4bH2puSh2/view?usp=sharing";
      let modelName = "Blast from the West";
      const model = await template.findByIdAndUpdate(modelId, {
        $set: { model: modelLink },
        $inc: { credits: 40 },
      });
      if (savedUser.credits < 40) {
        res.render("market/nocredits");
      }
      return { modelLink, modelName, model, credits: model.credits };
    } else if (pref > 4 && pref <= 6) {
      let modelName = "White Picket Fence House";
      const modelId = req.cookies.modelId;
      let modelLink =
        "https://drive.google.com/file/d/1aX8J8bVTmqXIXJTfaj8BCWNEjl5KYKgc/view?usp=sharing";
      const model = await template.findByIdAndUpdate(modelId, {
        $set: { model: modelLink },
        $inc: { credits: 50 },
      });
      if (savedUser.credits < 50) {
        res.render("market/nocredits");
      }
      return { modelLink, modelName, model, credits: model.credits };
    } else if (pref > 6) {
      let modelName = "2050 House";
      const modelId = req.cookies.modelId;
      let modelLink =
        "https://drive.google.com/file/d/15eMiCNO982Osvyo2QVwHI8HE654keq7u/view?usp=sharing";
      const model = await template.findByIdAndUpdate(modelId, {
        $set: { model: modelLink },
        $inc: { credits: 70 },
      });
      if (savedUser.credits < 70) {
        res.render("market/nocredits");
      }
      return { modelLink, modelName, model, credits: model.credits };
    }
  },
};
