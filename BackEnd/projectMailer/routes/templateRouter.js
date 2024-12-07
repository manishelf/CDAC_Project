const express = require('express');
const genericUtils = require('../utils/genericUtils');
const dbUtils = require('../utils/dbUtils');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

const router = express.Router();

router.post('/',
    async (request, response)=>{
        const {templateTitle, mailTemplate, keys} = request.body;
        const clientId = request.payload['id'];
        const template = {clientId, templateTitle, mailTemplate, keys};
        dbUtils.insertMailTemplate(template).then(
            (result)=>{
                response.send(genericUtils.createSuccessResponse('added template '+ templateTitle));
            }
        ).catch(
            (error)=>{
                if(String(error['sqlMessage']).includes("for key 'client_templates.client_id"))
                    response.send(genericUtils.createErrorResponse('template with name exists'));
                else
                    response.send(genericUtils.createErrorResponse(error));
            }
        );
    }
);

router.get('/',async (request, response)=>{
    const clientId = request.payload['id'];
    dbUtils.getClientTemplates(clientId).then(
        (result)=>{
            response.send(genericUtils.createSuccessResponse(result));
        }
    ).catch(
        (error)=>{
            response.send(genericUtils.createErrorResponse(error));
        }
    );
});

module.exports = router;