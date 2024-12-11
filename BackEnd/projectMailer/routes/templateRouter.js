const express = require('express');
const genericUtils = require('../utils/genericUtils');
const dbUtils = require('../utils/dbUtils');

const router = express.Router();

router.post('/',
    async (request, response)=>{

        const {templateTitle, mailTemplate, keys, callback} = request.body;
        const clientId = request.payload['id'];
        const template = {clientId, templateTitle, mailTemplate, keys, callback};

        dbUtils.insertMailTemplate(template).then(
            (result)=>{
                response.status(201).send(genericUtils.createSuccessResponse('added template '+ templateTitle));
            }
        ).catch(
            (error)=>{
                if(error['code']==='ER_DUP_ENTRY')
                    response.status(409).send(genericUtils.createErrorResponse('template with name exists'));
                else
                    response.status(500).send(genericUtils.createErrorResponse('internal server error'));
            }
        );
    }
);

router.get('/',async (request, response)=>{

    const clientId = request.payload['id'];
    
    dbUtils.getClientTemplates(clientId).then(
        (result)=>{
            response.status(201).send(genericUtils.createSuccessResponse(result));
        }
    ).catch(
        (error)=>{
            response.stautus(500).send(genericUtils.createErrorResponse('internal server error'));
        }
    );
});

module.exports = router;