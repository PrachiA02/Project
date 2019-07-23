const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/match/:id', (request, response) => {
    const id = request.params.id;
    console.log('---------------------'+id);
    const statement = `select * from MATCHES where Match_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, matches) => {
        connection.end();
        response.send(utils.createResponse(error, matches[0]));
    });
});

router.get('/match/status/:status', (request, response) => {
    const status = request.params.status;
    const statement = `select * from MATCHES where Match_Status = "${status}"`;
    const connection = db.connect();
    connection.query(statement, (error, matches) => {
        connection.end();
        response.send(utils.createResponse(error, matches));
    });
});

router.get('/match', (request, response) => {
    const statement = `select * from MATCHES`;
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

router.put('/match/inning', (request, response) => {
    const matchId = request.body.matchId;
    const battingTeam = request.body.battingTeam;
    
    const statement = `UPDATE MATCHES SET Batting_Team = ${battingTeam} where Match_Id= ${matchId}`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, matches) => {
        connection.end();
        response.send(utils.createResponse(error, matches));
    });
});

router.put('/match/status', (request, response) => {
    const matchId = request.body.matchId;
    const winningTeam = request.body.winningTeam ? request.body.winningTeam : NULL;
    const matchStatus = winningTeam ? 'COMPLETED' : 'DRAW';
    
    const statement = `UPDATE MATCHES SET Match_Status = '${matchStatus}', Winning_Team = ${winningTeam} where Match_Id= ${matchId}`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, matches) => {
        connection.end();
        response.send(utils.createResponse(error, matches));
    });
});

router.post('/match', (request, response) => {
    const team1 = request.body.team1;
    const team2 = request.body.team2;
    const stadium = request.body.stadium;
    const location = request.body.location;
    const matchType = request.body.matchType;
    const matchName = request.body.matchName;
    const battingTeam = request.body.battingTeam;
    const matchStatus =request.body.matchStatus;
    
    const statement = `insert into MATCHES
        (Match_Type,Match_Name,Team_A,Team_B,Match_Status,Batting_Team,Match_Stadium,Match_Location) values 
        ('${matchType}', '${matchName}', '${team1}', '${team2}', '${matchStatus}', '${battingTeam}', '${stadium}', '${location}')`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});

module.exports = router;