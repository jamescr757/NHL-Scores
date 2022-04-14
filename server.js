const express = require("express");
const routes = require("./routes");

const PORT = process.env.PORT || 3002;

const app = express();

const db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

db.sequelize.sync(syncOptions)
  .then(() => {

    require("./scrape/newCompleted")(db);
    // require("./scrape/deleteFuture")(db);
    require("./scrape/updateRecords")(db);
    // require("./scrape/allCompleted")(db);
    // require("./scrape/allFuture")(db);

    // set second input to > 10 if want to just update way in advance games
    require("./scrape/tixAndGameTime")(db, 15);

    app.listen(PORT, function() {
      console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
  })
  .then(() => {
    setTimeout(() => {
      require("./controllers/emailNewsletter")(db);
    }, 3 * 60 * 1000)
  })
  .then(() => {
    setTimeout(() => {
      require("./controllers/updateNextEmail")(db);
    }, 10 * 60 * 1000)
  });

