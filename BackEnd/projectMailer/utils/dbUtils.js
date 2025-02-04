const mysql = require('mysql2');
const configs = require('../configs');
const moment = require('moment');
const { response } = require('express');


const pool = mysql.createPool(configs.db);

/* DDL Query
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    cypher_password VARCHAR(255) NOT NULL
);
*/
const insertClient = async function (client){
    const {clientName,email,cypherPassword,} = client;
    const insertUserQuery = `
        INSERT INTO clients(name, email, cypher_password) VALUES (?,?,?)
    `;
    return new Promise((resolve, reject)=>{
        pool.execute(
            insertUserQuery,
            [clientName, email, cypherPassword],
            (error, result)=>{
                if(error) reject(error);
                if(result) resolve(result);
            }
        )
    });
}

const emailExistsInDb = async function(email){
    const selectUserQuery = `
        SELECT name FROM clients WHERE email = ?
    `;

    return new Promise((resolve, reject) => {
        pool.query(
            selectUserQuery,
            [email],
            (error, response) => {
                if (error) {
                    reject(error);
                } else {
                    if (response.length == 0) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                }
            }
        );
    });
}

 /* DDL Query
    CREATE TABLE client_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    template_title VARCHAR(50),
    subject VARCHAR(100),
    header TEXT,
    body TEXT,
    footer TEXT,
    template_keys TEXT,
    callback varchar(100),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    UNIQUE (client_id, template_title)
    );
    */

const insertMailTemplate = async function(template){
    const {clientId,templateTitle, mailTemplate, keys, callback} = template;
    
    const templateInsertStatement = `
        INSERT INTO client_templates(
        client_id, template_title,
        subject,header,body,footer,
        template_keys, callback
        )
        VALUES (?,?,?,?,?,?,?,?)
    `;
    return new Promise(
        (resolve, reject)=>{
            pool.execute(
                templateInsertStatement,
                [clientId, templateTitle,
                    mailTemplate.subject,
                    mailTemplate.header,
                    mailTemplate.body,
                    mailTemplate.footer,
                    keys,
                    callback
                ],
                (error, result)=>{
                    if(error) reject(error);
                    else resolve(result);
                }
            )
        }
    );
}

const getClientTemplates = async function(clientId){
    const templateInsertStatement = `
        select template_title, subject, header, body, footer, template_keys
        from client_templates where client_id = ?
    `;
    return new  Promise(
        (resolve, reject)=>{
            pool.query(
                templateInsertStatement,
                [clientId],
                (error, result)=>{
                    if(error) reject(error);
                    else resolve(result);
                }
            );
        }
    );
}

// for caching the templates retrieved form db to reduce requests
const TemplateCacheList = new Map();

const getMailTemplateByName = async function (clientId, templateName) {
    const selectTemplateQuery = `
        SELECT  subject, header, body, footer, template_keys, callback FROM client_templates WHERE client_id = ? AND template_title = ?
    `;
    const cache = TemplateCacheList.get(templateName);
    if(cache) {
        return new Promise((resolve,reject)=>{resolve(cache)});
    }
    else {
        return new Promise((resolve, reject)=>{
            pool.query(
                selectTemplateQuery,
                [clientId, templateName],
                (error, result)=>{
                    if(error) reject(error);
                    else{
                        if(result.length == 0)
                            reject('no template found');
                        else{
                            TemplateCacheList.set(templateName, result[0]);
                            resolve(result[0]);
                        }
                    }
                }
            );
        });
    }
}

/*
CREATE TABLE mail_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    log_level VARCHAR(50) NOT NULL,
    accepted_recipients JSON NOT NULL,
    rejected_recipients JSON NOT NULL,
    message_id VARCHAR(255) NOT NULL,
    time_stamp DATETIME NOT NULL,
    smtp_response JSON NOT NULL
);
*/
const createMailLog = async function(clientId, result){
    const log = {
        type: "email-status",
        logLevel:"INFO",
        clientId,
        acceptedRecipients: result.result['accepted'],
        rejectedRecipients: result.result['rejected'],
        messageId: result.result['messageId'],
        timeStamp: moment().format(),
        smtpResponse : result
    }
    const logInsertQuery = `
        INSERT INTO mail_logs (
            client_id, 
            type, 
            log_level, 
            accepted_recipients, 
            rejected_recipients, 
            message_id, 
            time_stamp, 
            smtp_response
        ) VALUES (
            ?,?,?,?,?,?,?,?
        )
    `;
    const logValues = [
        log.clientId,
        log.type,
        log.logLevel,
        log.acceptedRecipients,
        log.rejectedRecipients,
        log.messageId,
        log.timeStamp,
        log.smtpResponse
    ];
    
    return new Promise((resolve, reject)=>{
            pool.execute(
                logInsertQuery,
                logValues,
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        }
    );
}

module.exports = {
    pool,
    insertClient,
    emailExistsInDb,
    insertMailTemplate,
    getClientTemplates,
    getMailTemplateByName,
    createMailLog,
}