create database parkngo_mailer_db;
use parkngo_mailer_db;

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    cypher_password VARCHAR(255) NOT NULL
);

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


