const UnauthenticatedError = require('./unauthentication');
const CustomAPIError = require('./custom-errors');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');

module.exports = {
    CustomAPIError,
    UnauthenticatedError,
    NotFoundError,
    BadRequestError
};
