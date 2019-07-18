const express = require('express');
const db = require('./db');
const utils = require('./utils');

const router = express.Router();

router.post('/user/login', (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    const statement = `select User_Id, First_Name, Last_Name, Email from USER where Email ='${email}' and Password = '${password}'`;
    const connection = db.connect();
    connection.query(statement, (error, users) => {
        connection.end();

        const result = {};
        if (error) {
            result['status'] = 'error';
            result['error'] = error;
        } else {
            if (users.length == 0) {
                // user doesnot exist
                result['status'] = 'error';
                result['error'] = 'invalid email or password';
            } else {
                // user exists
                result['status'] = 'success';
                result['data'] = users[0];
            }
        }
        
        response.send(result);
    });
});

router.post('/user/register', (request, response) => {
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const email = request.body.email;
    const password = request.body.password;

    const statement = `insert into USER
        (First_Name, Last_Name, Email, Password) values
        ('${firstName}', '${lastName}', '${email}', '${password}')`;
    const connection = db.connect();
    connection.query(statement, (error, result) => {
        connection.end();
        response.send(utils.createResponse(error, result));
    });
});

module.exports = router;
