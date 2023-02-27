const { defaults } = require('lodash');
const constants = require('../constants');

const errorHandler = (error, req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Error", message: error.message, stackTrace: error.stack });
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized", message: error.message, stackTrace: error.stack });
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden", message: error.message, stackTrace: error.stack });
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: error.message, stackTrace: error.stack });
        case constants.SERVER_ERROR:
            res.json({ title: "Server not found", message: error.message, stackTrace: error.stack });
    default:
        console.log('No exception found! All Good :)')
        break;
    };  
};
module.exports = errorHandler;