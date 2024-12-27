const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');
const crypto = require('crypto');

function createErrorResponse(error){
    return {status:"error", error};
}

function createSuccessResponse(data){
    return {status:"success", data}
}

function createResponse(error, success){
    if(error) return createErrorResponse(error)
    else return createSuccessResponse(success)
}

// hash using sha512 and RSA - pbkdf2
function hashPassword(password){
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

function createToken(payload, options={}){
    let token = jwt.sign(payload, secrets.jwtSignSecret,options);
    return encryptToken(token);
}

//encrypting using aes-256
function encryptToken(token){
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(secrets.jwtEncryptionSecret, 'salt', 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}

function decryptToken(encryptedToken){
    const algorithm = 'aes-256-cbc';
    const [ivHex, encryptedData] = encryptedToken.split(':');
    
    const key = crypto.scryptSync(secrets.jwtEncryptionSecret, 'salt', 32);
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; 
}

//Authentication middleware
const jwtAuthMiddleware = async (request, response, next) => {
    if(request.url === '/api/v1/register') next()
    else{
        const {token} = request.headers;
        if(token === undefined) response.send(createErrorResponse('missing token'));
        else{
            try{
                const decryptedToken = decryptToken(token);
                const payload = jwt.verify(decryptedToken, secrets.jwtSignSecret);
                request.payload = payload;
                next();
            }catch{
                response.send(createErrorResponse('Invalid Token'));
            }
        }
    }
}

module.exports = {
    createResponse,
    createErrorResponse,
    createSuccessResponse,
    hashPassword,
    createToken,
    jwtAuthMiddleware,
}