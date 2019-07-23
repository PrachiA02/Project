const express = require('express');
const bodyParser = require('body-parser');

const usersRouter = require('./user');
const teamRouter = require('./team');
const playerRouter = require('./player');
const teamPlayerMappingRouter = require('./teamPlayerMapping');
const matchRouter = require('./match');
const scoreRouter = require('./score');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// no route is required for any file in the images directory
app.use(express.static('images'));

app.use(usersRouter);
app.use(teamRouter);
app.use(playerRouter);
app.use(teamPlayerMappingRouter);
app.use(matchRouter);
app.use(scoreRouter);

app.listen(3000, '0.0.0.0', () => {
    console.log(`Server started on port 3000`);
});
