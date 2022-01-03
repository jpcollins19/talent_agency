////skill:id
//a hard reset is the only way to update the skill length info and the skill info that is assigned to the client

////client:id
//a hard reset removes any skill adjustments that have been made
//unable to delete the last skill
//if you press the back button, the client listing is whack

const express = require("express");
const app = express();
const { syncAndSeed } = require("./db/postgres_info.js");
const path = require("path");
const { idle_in_transaction_session_timeout } = require("pg/lib/defaults");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.use("/public/css", express.static(path.join(__dirname, "public/css")));
app.use("/public/pics", express.static(path.join(__dirname, "public/pics")));

app.use("/", require("./routers/client_model_router.js"));
app.use("/", require("./routers/skill_model_router.js"));
app.use("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "html/main.html"))
);

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.port || 2010;
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
