const app = require("express").Router();

const {
  models: { Client, Skill },
} = require("../db/postgres_info.js");

app.get("/api/skills", async (req, res, next) => {
  try {
    const skills = await Skill.findAll({
      // include: { model: Client, as: "skillListing" },
      include: [Client],
    });
    res.send(skills);
  } catch (err) {
    next(err);
  }
});

app.put("/api/skills/:id", async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);

    await skill.update(req.body);

    res.send(skill);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
