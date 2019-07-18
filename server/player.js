const express = require('express');
const db = require('./db');
const utils = require('./utils');
const multer = require('multer');
const upload = multer({ dest: 'images/' })

const router = express.Router();

router.get('/player/:id', (request, response) => {
    const id = request.params.id;
    console.log('player id is :'+id);
    const statement = `select * from PLAYERS where Player_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, players) => {
        connection.end();
        response.send(utils.createResponse(error, players[0]));
    });
});

router.get('/player', (request, response) => {
    const statement = `select Player_Id, Player_Name, Player_Photo from PLAYERS`;
    const connection = db.connect();
    connection.query(statement, (error, players) => {
        connection.end();
        response.send(utils.createResponse(error, players));
    });
});

router.delete('/player/:id', (request, response) => {
    const id = request.params.id;
    const statement = `delete from PLAYERS where Player_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, players) => {
        connection.end();
        response.send(utils.createResponse(error, players));
    });
});

router.post('/player', upload.single('playerPhoto'), (request, response) => {
    const playerName = request.body.name;
    const birthDate = request.body.birthDate;
    const age = request.body.age;
    const majorTeams = request.body.majorTeams;
    const playingRole = request.body.playingRole;
    const bowlingStyle = request.body.bowlingStyle;
    const batingStyle = request.body.batingStyle;
    const nativePlace = request.body.nativePlace;
    const description = request.body.description;
    const playerPhoto = request.file.filename;
    
    const statement = `insert into PLAYERS
        (Player_Name, Player_Photo, Age, BirthDate, MajorTeams, PlayingRole, BatingStyle, BowlingStyle, Description, NativePlace) values 
        ('${playerName}', '${playerPhoto}', '${age}', '${birthDate}', '${majorTeams}', '${playingRole}', '${batingStyle}', '${bowlingStyle}', '${description}', '${nativePlace}')`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, players) => {
        connection.end();
        response.send(utils.createResponse(error, players));
    });
});

module.exports = router;