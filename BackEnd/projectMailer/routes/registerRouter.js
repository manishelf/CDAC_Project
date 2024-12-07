const express = require('express');
const crypto = require('crypto-js');
const dbUtils = require('../utils/dbUtils');
const utils = require('../utils/genericUtils');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

const router = express.Router();

router.post('/',
    async (request, response)=>{ // async as the db is fetched for the email using a execute, promise and await
        const {clientName , email, password}= request.body;
        //check if email exist in db
        // const exists=await dbUtils.emailExistsInDb(email).then((exists) => {return exists;});
        const exists = false;
        if(!exists){
            const cypherPassword = String(crypto.MD5(password));
            const client = {clientName, email, cypherPassword,};
            dbUtils.insertClient(client)
            .then(
                (result)=>{
                    const payload = {
                        id:result.insertId,
                        clientName,
                        email
                    };
                    const token = jwt.sign(payload, secrets.jwtSignSecret,{});
                    response.send(utils.createSuccessResponse({
                        token
                    }));
                }
            ).catch(
                (error)=>{
                    if(error['code']==='ER_DUP_ENTRY')
                        response.send(utils.createErrorResponse('email already in use'));
                    else response.send(utils.createErrorResponse(error));
                }
            );
            // should be encrypted
        }
        // else{
        //     response.send(utils.createErrorResponse('email already in use'));
        // }
    }
);

module.exports = router;