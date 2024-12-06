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

module.exports = {
    createResponse,
    createErrorResponse,
    createSuccessResponse
}