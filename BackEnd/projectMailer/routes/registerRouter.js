const express = require('express');
const crypto = require('crypto-js');
const dbUtils = require('../utils/dbUtils');
const utils = require('../utils/genericUtils');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

const router = express.Router();

//create table clients(id int auto_increment primary key, name varchar(50), email varchar(50), cypher_password varchar(50));
router.post('/',
    async (request, response)=>{ // async as the db is fetched for the email using a execute, promise and await
        const {clientName , email, password}= request.body;
        //check if email exist in db
        const exists=await dbUtils.emailExistsInDb(email).then((exists) => {return exists;});
        if(!exists){
            const cypherPassword = String(crypto.MD5(password));
            const client = {clientName, email, cypherPassword,};
            dbUtils.insertClient(
                client,
                (error,result)=>{
                    if(error) response.send(utils.createErrorResponse(error));
                    else{
                        const payload = {
                            id:result.insertId,
                            clientName,
                            email
                        };
                        const token = jwt.sign(payload, secrets.jwtSignSecret,{});
                        response.send(utils.createResponse(error, {
                            token
                        }));
                    }
                }
            );
            // should be encrypted
        }else{
            response.send(utils.createErrorResponse('email already in use'));
        }
    }
);

module.exports = router;