const express = require('express');
const mailer = require('nodemailer');
const dbUtils = require('../utils/dbUtils');
const genericUtils = require('../utils/genericUtils');
const secrets = require('../secrets/secrets');
const jwt = require('jsonwebtoken');

const router = express.Router();

const transporter = mailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: secrets.mail.user,
            pass: secrets.mail.pass
        }
    }
);

router.post('/',
    async (request, response)=>{
        const {token, mail} = request.body;
        if(mail == undefined) {
            response.send(genericUtils.createErrorResponse('Missing Mail'));
        }
        else
        {
            const mail = request.body['mail'];
            try{
                const clientId = request.payload.id;
                const mailTemplate = await dbUtils.getMailTemplateByName(clientId, mail['templateName'])
                                        .then((template)=>{return template;})
                                        .catch((error)=>{
                                            response.send(genericUtils.createErrorResponse(error))
                                        });
                const entries = mail['entries'];
                let subject = mailTemplate['subject'];
                let html = mailTemplate['headder'] +mailTemplate['body']+mailTemplate['footer'];
                for (const key in entries) {
                    subject = subject.replaceAll(`#[${key}]`, entries[key]);
                    html = html.replaceAll(`#[${key}]`, entries[key]);
                }
                try{
                    const result = await transporter.sendMail(
                        {
                            to: mail['recipients'],
                            subject,
                            html
                        }
                    );
                    dbUtils.createMailLog(clientId, result).catch((error)=>{genericUtils.createErrorResponse(error)});
                    response.send(genericUtils.createSuccessResponse(
                            'mail sent to : '+ result['accepted'] +
                            (result['rejected'].length!=0)? 'rejected : '+result['rejected'] : ''
                        )
                    );
                }catch(error){
                    response.send(genericUtils.createErrorResponse(error));
                }
            }catch{
                response.send(genericUtils.createErrorResponse('Invalid Token'));
            }
        }
    }
);

router.get('/',
    (request, response)=>{
        const {token} = request.body;
        const getAllMailLogs = `
            SELECT * FROM mail_logs where client_id = ?;
        `
        dbUtils.pool.execute(
            getAllMailLogs,
            [request.payload['id']],
            (error, result)=>{
                response.send(genericUtils.createResponse(error, result));
            }
        ); 
    }
);

module.exports = router;