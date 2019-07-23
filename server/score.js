const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/score/:matchId/:battingTeamId', (request, response) => {
    const matchId = request.params.matchId;
    const battingTeamId = request.params.battingTeamId;
    
    const statement = `select SUM(Runs) as Runs, SUM(Wickets) as Wickets, COUNT(*) as Balls from SCORE 
                        where Match_Id= ${matchId} and Batting_Team= ${battingTeamId}`;
    const connection = db.connect();
    connection.query(statement, (error, score) => {
        connection.end();
        response.send(utils.createResponse(error, score[0]));
    });
});

router.get('/score/match/:matchId/:battingTeamId', (request, response) => {
    const matchId = request.params.matchId;
    const battingTeamId = request.params.battingTeamId;
    
    const statement = `select * from SCORE where Match_Id= ${matchId} and Batting_Team= ${battingTeamId}
                        ORDER BY Score_Id DESC LIMIT 10`;
    const connection = db.connect();
    connection.query(statement, (error, score) => {
        connection.end();
        response.send(utils.createResponse(error, score));
    });
});

router.delete('/team/:id', (request, response) => {
    const id = request.params.id;
    const statement = `delete from  TEAMS where Team_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});

router.post('/score', (request, response) => {
    const matchId = request.body.matchId;
    const overs = request.body.overs;
    const balls = request.body.balls;
    const runs = request.body.runs;
    const batId = request.body.batId;
    const ballerId = request.body.ballerId;
    const wickets = request.body.wickets;
    const battingTeam = request.body.battingTeam;
    const discription = request.body.discription;
    
    const statement = `insert into SCORE
        (Match_Id, Overs, Balls, Runs, Bat_Id, Baller_Id, Wickets, Batting_Team, Discription) values 
        ('${matchId}', '${overs}', '${balls}', '${runs}', '${batId}', '${ballerId}','${wickets}', '${battingTeam}', '${discription}')`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, score) => {
        connection.end();
        response.send(utils.createResponse(error, score));
    });
});

module.exports = router;