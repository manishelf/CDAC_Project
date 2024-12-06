const express = require('express');
const genericUtils = require('../utils/genericUtils');
const dbUtils = require('../utils/dbUtils');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

const router = express.Router();

router.post('/',
    (request, response)=>{
        const {token, templateTitle, mailTemplate, keys} = request.body;
        if(token == undefined) response.send(genericUtils.createErrorResponse('Missing Token'));
        try{
            const payload = jwt.verify(token, secrets.jwtSignSecret);
            const clientId = payload['id'];
            const template = {clientId, templateTitle, mailTemplate, keys};

            dbUtils.insertMailTemplate(template,(error, result)=>{
                response.send(genericUtils.createResponse(error, 'added template '+ templateTitle));
            });
        }catch{
            response.send(genericUtils.createErrorResponse('Invalid Token'));
        }
    }
);

router.get('/',(request, response)=>{
    const {token} = request.body;
        if(token == undefined) response.send(genericUtils.createErrorResponse('Missing Token'));
        try{
            const payload = jwt.verify(token, secrets.jwtSignSecret);
            const clientId = payload['id'];
            dbUtils.getClientTemplate(clientId,(error, result)=>{
                response.send(genericUtils.createResponse(error, result));
            });
        }catch{
            response.send(genericUtils.createErrorResponse('Invalid Token'));
        }
});

module.exports = router;