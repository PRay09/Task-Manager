

class errCustom extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomError = (msg, statusCode)=>{
    return new errCustom(msg,statusCode)
}
 

module.exports = { createCustomError,errCustom }