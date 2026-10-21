export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
    }
}



/*  this is for testing purpose : 
const err = new AppError("something went wrong", 500)
console.log(err) */