const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/hw_talent_agency"
);
const { STRING, INTEGER } = Sequelize;

const Client = db.define("clients", {
  name: {
    type: STRING,
  },
});

const Skill = db.define("skills", {
  name: {
    type: STRING,
  },
});

const ClientSkills = db.define("clientSkills", {});

const names = ["Moe", "Larry", "Curly", "Lucy", "James"];

const skills = [
  "singing",
  "dancing",
  "acting",
  "juggling",
  "plate spinning",
  "long division",
];

Client.belongsToMany(Skill, { through: "clientSkills" });
Skill.belongsToMany(Client, { through: "clientSkills" });

const syncAndSeed = async () => {
  await db.sync({ force: true });

  const [Moe, Larry, Curly, Lucy, James] = await Promise.all(
    names.map((name) => Client.create({ name }))
  );

  const [singing, dancing, acting, juggling, plate_spinning, long_division] =
    await Promise.all(skills.map((name) => Skill.create({ name })));

  await Promise.all([
    Moe.addSkill(singing),
    Moe.addSkill(acting),
    Larry.addSkill(singing),
    Lucy.addSkill(dancing),
    Lucy.addSkill(plate_spinning),
    James.addSkill(juggling),
  ]);
};

module.exports = {
  syncAndSeed,
  models: { Client, Skill, ClientSkills },
};
