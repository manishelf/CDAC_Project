const express = require('express');
const dbUtils = require('../utils/dbUtils');
const utils = require('../utils/genericUtils');

const router = express.Router();

router.post('/',
    async (request, response)=>{ 

        const {clientName , email, password}= request.body;
        if(clientName.length===0||email.length===0||password===0) return response.status(400).send('clientName and email and password cannot be empty');

        const cypherPassword = utils.hashPassword(password);

        const client = {clientName, email, cypherPassword};

        dbUtils.insertClient(client)
        .then(
            (result)=>{
                const payload = {
                    id:result.insertId,
                    clientName,
                    email
                };
                const token = utils.createToken(payload);
                response.status(201);
                response.send(utils.createSuccessResponse({token}));
            }
        ).catch(
            (error)=>{
                if(error['code']==='ER_DUP_ENTRY')
                    response.status(409).send(utils.createErrorResponse('email already in use'));
                else response.status(500).send(utils.createErrorResponse('internal server error'));
            }
        );
        
    }
);

module.exports = router;