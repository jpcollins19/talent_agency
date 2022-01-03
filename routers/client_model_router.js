const app = require("express").Router();

const {
  models: { Client, Skill },
} = require("../db/postgres_info.js");

app.get("/api/clients", async (req, res, next) => {
  try {
    const clients = await Client.findAll({
      // include: [{ model: Skill, as: "skillListing" }],

      include: [Skill],
    });
    res.send(clients);
  } catch (err) {
    next(err);
  }
});

app.put("/api/clients/:id", async (req, res, next) => {
  try {
    const clientOG = await Client.findByPk(req.params.id);

    //how can i do the below search without needing the above client variable?
    const client = await Client.findOne({
      where: clientOG.id === Number(req.params.id),
      include: [Skill],
    });

    await client.update(req.body);

    res.send(client);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
