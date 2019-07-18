const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/match/:id', (request, response) => {
    const id = request.params.id;
    const statement = `select Team_Id, Team_Name, Country_Name, Team_Icon from TEAMS where Team_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams[0]));
    });
});

router.get('/match', (request, response) => {
    const statement = `select Team_Id, Team_Name, Country_Name, Team_Icon from TEAMS`;
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});

router.delete('/match/:id', (request, response) => {
    const id = request.params.id;
    const statement = `delete from  TEAMS where Team_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});

router.post('/match', (request, response) => {
    const team1 = request.body.team1;
    const team2 = request.body.team2;
    const stadium = request.body.stadium;
    const location = request.body.location;
    const matchType = request.body.matchType;
    const matchName = request.body.matchName;
    const date = request.body.date;
    const matchStatus =request.body.matchStatus;
    
    const statement = `insert into MATCHES
        (Match_Type,Match_Name,Team_A,Team_B,Match_Status,Match_Date,Match_Stadium,Match_Location) values 
        ('${matchType}', '${matchName}', '${team1}', '${team2}', '${matchStatus}', '${date}', '${stadium}', '${location}')`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});

module.exports = router;