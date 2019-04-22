const express = require('express');
const path = require('path');
const passport = require('passport');
const app = express();

// Defines a PORT for the server to listen for requests
const PORT = process.env.PORT || 8080;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

// Routes

require('./routes/apiRoutes.js')(app);
require('./routes/htmlRoutes.js')(app);

const db = require('./models');

db.sequelize.sync().then(function () {
    console.log('Database is synced!');

    app.listen(PORT, function () {
        console.log(`App is now listening on PORT ${PORT}`)
    });

});