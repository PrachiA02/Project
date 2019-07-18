const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.get('/teamPlayerMapping/:id', (request, response) => {
    const teamId = request.params.id;
    const statement = `select Team_Id, Player_Id from TEAMPLAYERMAPPING where Team_Id = ${teamId}`;
    const connection = db.connect();
    connection.query(statement, (error, teamPlayers) => {
        connection.end();
        response.send(utils.createResponse(error, teamPlayers));
    });
});

router.post('/teamPlayerMapping/:id', (request, response) => {
    const teamId = request.params.id;
    const players = request.body;

    const records = [];
    players.forEach(player => {
        records.push([teamId, player.playerId]);
    });

    const insertStatement = `insert into TEAMPLAYERMAPPING (Team_Id, Player_Id) values ?`;
    const connection = db.connect();
    
    connection.query(insertStatement, [records], (error, teams) => {
        response.send(utils.createResponse(error, teams));
    });
});
router.delete('/teamPlayerMapping/:id', (request, response) => {
    const teamId = request.params.id;
    const deleteStatement = `DELETE FROM TEAMPLAYERMAPPING where Team_Id= ${teamId}`;
    const connection = db.connect();
    connection.query(deleteStatement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});


module.exports = router;