const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/INSERT PG DB"

  //////////////insert db above//////////
);

//npm i @babel/core @babel/preset-react axios babel-loader nodemon react react-dom webpack webpack-cli redux react-redux redux-thunk redux-logger react-router-dom@5.3.0 --save-dev

//npm i express pg sequelize

////////////////////////////////////////////

//do:  npm run byah -- this will get your dist folder to show

/* 

Move your unwanted data to the gitignore 

    echo node_modules >> .gitignore 
    echo dist/ >> .gitignore 

*/

// const User = db.define("users", {
//   name: {
//     type: STRING,
//   },
// });

const syncAndSeed = async () => {
  await db.sync({ force: true });
};

module.exports = {
  syncAndSeed,
  // models: { User },
};
