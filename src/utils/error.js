// class AppError extends Error {
//   constructor(message, statusCode, errorCode) {
//     super(message);
//     this.statusCode = statusCode;
//     this.errorCode = errorCode;
//     this.isOperational = true;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

//module.exports = AppError;
// src/utils/errors.js

// Import required elements from http-status-code
const { StatusCodes, getReasonPhrase } = require('http-status-codes'); //  correct

// Using the enum-like constants to print status codes
console.log('Status Codes:');
console.log(`OK: ${StatusCodes.OK}`);                          // Output: 200
console.log(`NOT_FOUND: ${StatusCodes.NOT_FOUND}`);            // Output: 404
console.log(`INTERNAL_SERVER_ERROR: ${StatusCodes.INTERNAL_SERVER_ERROR}`); // Output: 500

// Getting the reason phrase (text description) for status codes
console.log('\nReason Phrases:');
console.log(`${StatusCodes.OK} - ${getReasonPhrase(StatusCodes.OK)}`);             // 200 - OK
console.log(`404 - ${getReasonPhrase(404)}`);                                       // 404 - Not Found
console.log(`500 - ${getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)}`);        

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class AppError extends Error {
  // constructor(message = "Not Found") {
  //   super(message, 404);
  // }
  constructor(message, statusCode = 400, errorCode = "Not Found") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    // Maintains proper stack trace (for V8 engines like Node.js)
    Error.captureStackTrace(this, this.constructor);
  }
}




class NotFoundException extends ApiError {
  constructor(message = "Not Found") {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class BadRequestException extends ApiError {
  constructor(message = "Not Found") {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class UnauthorizedException extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class ForbiddenException extends ApiError {
  constructor(message = "Forbidden") {
    super(message,StatusCodes. FORBIDDEN);
  }
}

class ConflictException extends ApiError {
  constructor(message = "Conflict") {
    super(message, StatusCodes .CONFLICT );
  }
}

class UnprocessableEntityException extends ApiError {
  constructor(message = "Unprocessable Entity") {
    super(message, StatusCodes. UNPROCESSABLE_ENTITY );
  }
}

class InternalServerErrorException extends ApiError {
  constructor(message = "Internal Server Error") {
    super(message, StatusCodes. INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  ApiError,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  UnprocessableEntityException,
  InternalServerErrorException,
  AppError
};
