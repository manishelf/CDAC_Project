const express = require('express');
const mailer = require('nodemailer');
const dbUtils = require('../utils/dbUtils');
const genericUtils = require('../utils/genericUtils');
const secrets = require('../secrets/secrets');
const axios = require('axios');

const router = express.Router();

const transporter = mailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: secrets.mail.user,
            pass: secrets.mail.pass
        },
        pool: true
    }
);

// for async communication with client
async function handleCallbackToClient(clientId, callbackURL, result){
    try{
        let calbackResult = await axios.post(
            callbackURL,
            genericUtils.createSuccessResponse({
                recipients : result['accepted'],
                rejected : result['rejected']
            })
        );
        dbUtils.createMailLog(clientId, {result, calbackResult});
    }catch(exception){
        dbUtils.createMailLog(clientId, {result, calbackResult:exception});
    }
}

//Mailing request endpoint
router.post('/',
    async (request, response)=>{
        const mail = request.body['mail'];

        if(!mail) {
            response.status(400);
            return response.send(genericUtils.createErrorResponse('Missing Mail'));
        }

        const clientId = request.payload.id;

        //fetch mail template from db
        const mailTemplate = await dbUtils.getMailTemplateByName(clientId, mail['templateName'])
                                    .then(template=>template)
                                    .catch((error)=>{
                                        response.status(400);
                                        response.send(genericUtils.createErrorResponse('mail template not found'));
                                    });
        if(!mailTemplate) return;  

        let subject = mailTemplate['subject'];
        let html =`${mailTemplate.header}${mailTemplate.body}${mailTemplate.footer}`;

        // populate the placeholders in the mail template with corresponding values
        const entries = mail['entries'];
        for (const key in entries) {
            subject = subject.replaceAll(`#[${key}]`, entries[key]);
            html = html.replaceAll(`#[${key}]`, entries[key]);
        }

        response.status(202);
        response.send(genericUtils.createSuccessResponse(
            'Request recieved!'
        ));

        const result = await transporter.sendMail(
            {
                to: mail['recipients'],
                subject,
                html
            }
        );

        //send confirmation asyncronously
        handleCallbackToClient(clientId, mail['callback'], result);
    }
);

// clients mail logs 
router.get('/',
    (request, response)=>{
        const getAllMailLogs = `
            SELECT * FROM mail_logs where client_id = ? LIMIT ? OFFSET ?
        `
        const page = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;
        const offset = (page - 1) * limit;

        dbUtils.pool.execute(
            getAllMailLogs,
            [request.payload['id'], String(limit) , String(offset)],
            (error, result)=>{
                response.send(genericUtils.createResponse(error?'internal server error':null, result));
            }
        ); 
    }
);


module.exports = router;