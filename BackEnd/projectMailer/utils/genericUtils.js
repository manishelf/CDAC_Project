const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

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

function jwtAuthMiddleware(request, response, next){
    if(request.url === '/register') next()
    else{
        const {token} = request.headers;
        if(token === undefined) response.send(createErrorResponse('missing token'));
        else{
            try{
                const payload = jwt.verify(token, secrets.jwtSignSecret);
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
    jwtAuthMiddleware
}