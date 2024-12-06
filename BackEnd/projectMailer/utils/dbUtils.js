const mysql = require('mysql2');
const configs = require('../configs');
const utils = require('./genericUtils');

const {host, port, user, password, database} = configs.db;

const dbConfigs = {
    host,
    port,
    user,
    password,
    database,
}

const pool = mysql.createPool(dbConfigs);
//create table clients(id int auto_increment primary key, name varchar(50), email varchar(50), cypher_password varchar(50));
const insertClient = async function (client,callBack){
    const {clientName,email,cypherPassword,} = client;
    const insertUserQuery = `
        INSERT INTO clients(name, email, cypher_password) VALUES (?,?,?)
    `;
    pool.execute(
        insertUserQuery,
        [clientName, email, cypherPassword],
        callBack
    );
}

const emailExistsInDb = async function(email){
    const selectUserQuery = `
        SELECT name FROM clients WHERE email = ?
    `;
    let result;

    return new Promise((resolve, reject) => {
        pool.execute(
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

const insertMailTemplate = async function(template, callBack){
    const {clientId,templateTitle, mailTemplate, keys} = template;
    /*
    CREATE TABLE client_templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    template_title VARCHAR(50),
    subject varchar(100),
    headder varchar(255),
    body TEXT,
    footer varchar(255),
    template_keys TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id)
    );
    */
    const templateInsertStatement = `
        INSERT INTO client_templates(
        client_id, template_title,
        subject,headder,body,footer,
        template_keys
        )
        VALUES (?,?,?,?,?,?,?)
    `;
    pool.execute(
        templateInsertStatement,
        [clientId, templateTitle,
            mailTemplate.subject,
            mailTemplate.headder,
            mailTemplate.body,
            mailTemplate.footer,
            keys],
        callBack
    );
}

const getClientTemplate = async function(clientId, callBack){
    const templateInsertStatement = `
        select template_title, subject, headder, body, footer, template_keys
        from client_templates where client_id = ?
    `;
    pool.execute(
        templateInsertStatement,
        [clientId],
        callBack
    );
};

module.exports = {
    pool,
    insertClient,
    emailExistsInDb,
    insertMailTemplate,
    getClientTemplate
}