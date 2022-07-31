const user = require("../models/user");
const template = require("../models/template");

module.exports = {
  recommendModel: async (req, res, next) => {
    const userId = req.user["_id"];
    const savedUser = await user.findById(userId);
    let preferences = savedUser["preferences"];
    let budget = preferences[-1];
    let size = preferences[-2];
    let pref = 0;
    console.log(budget);
    console.log(size);
    for (let i = 0; i < preferences.length - 2; i++) {
      if (preferences[i].includes("old")) {
        pref += 1;
      } else if (preferences[i].includes("small")) {
        pref += 1;
      } else if (preferences[i].includes("simple")) {
        pref += 1;
      } else if (preferences[i].includes("big")) {
        pref += 3;
      } else if (preferences[i].includes("modern")) {
        pref += 3.5;
      } else if (preferences[i].includes("suburban")) {
        pref += 4.5;
      } else if (preferences[i].includes("modern")) {
        pref += 3;
      }
    }
    console.log(pref);
    if (pref < 3) {
      // Model 1
    } else if (pref > 3 && pref <= 4) {
      // Model 2
    } else if (pref > 4 && pref <= 6) {
      // Model 3
    } else if (pref > 6) {
      // Model 4
    }
  },
};
