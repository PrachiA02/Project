const express = require('express');
const db = require('./db');
const utils = require('./utils');
const multer = require('multer');
const upload = multer({ dest: 'images/' })

const router = express.Router();

router.get('/team/:id', (request, response) => {
    const id = request.params.id;
    const statement = `select Team_Id, Team_Name, Country_Name, Team_Icon from TEAMS where Team_Id = ${id}`;
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams[0]));
    });
});

router.get('/team', (request, response) => {
    const statement = `select Team_Id, Team_Name, Country_Name, Team_Icon from TEAMS`;
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
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

router.post('/team', upload.single('teamIcon'), (request, response) => {
    const teamName = request.body.name;
    const countryName = request.body.country;
    const teamIcon = request.file.filename;
    
    const statement = `insert into TEAMS
        (Team_Name, Country_Name, Team_Icon) values 
        ('${teamName}', '${countryName}', '${teamIcon}')`;

    console.log(statement);
    const connection = db.connect();
    connection.query(statement, (error, teams) => {
        connection.end();
        response.send(utils.createResponse(error, teams));
    });
});

module.exports = router;