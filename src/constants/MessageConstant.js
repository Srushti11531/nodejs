// // src/utils/MessageConstant.js

// class MessageConstant {
//   // USER: {
//   CREATE_SUCCESS = "User created successfully"
//   UPDATE_SUCCESS = "User updated successfully"
//   DELETE_SUCCESS = "User deleted successfully"
//   FETCH_SUCCESS = "User(s) fetched successfully"
//   NOT_FOUND = "User not found"
//   EMAIL_EXISTS = "Email already exists"
//   INVALID_ID = "Invalid user ID"
//   INVALID_EMAIL_OR_PASSWORD = "Invalid email or password"
//   ALL_FIELDS_REQUIRED = "All fields are required"
//   CREATE_FAILED = "Failed to create user"
//   FETCH_FAILED = "Failed to fetch users"
//   INVALID_CREDENTIALS = "Invalid credentials"
//   BLOCKED = "Blocked account"
//   // }

//   // AUTH= {
//   LOGIN_SUCCESS = "Login successful"
//   INVALID_CREDENTIALS = "Invalid email or password"
//   UNAUTHORIZED = "Unauthorized access"
//   TOKEN_REQUIRED = "Token is required"
//   INVALID_TOKEN = "Invalid or expired token"
//   // }

//   // COMMON: {
//   SERVER_ERROR = "Internal Server Error"
//   BAD_REQUEST = "Bad Request"
//   FORBIDDEN = "Forbidden"
//   VALIDATION_FAILED = "Validation failed"
//   INTERNAL_ERROR = "Something went wrong"
//   VALIDATION_ERROR = "Validation failed"
//   // }


//   A = (remainingMin = '') => `${BLOCKED} Try again in ${remainingMin} minute(s).`
// }

// module.exports = MessageConstant
class MessageConstant {
  // USER messages
  static USER = {
    CREATE_SUCCESS: "User created successfully",
    UPDATE_SUCCESS: "User updated successfully",
    DELETE_SUCCESS: "User deleted successfully",
    FETCH_SUCCESS: "User(s) fetched successfully",
    NOT_FOUND: "User not found",
    EMAIL_EXISTS: "Email already exists",
    INVALID_ID: "Invalid user ID",
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
    ALL_FIELDS_REQUIRED: "All fields are required",
    CREATE_FAILED: "Failed to create user",
    FETCH_FAILED: "Failed to fetch users",
    INVALID_CREDENTIALS: "Invalid credentials",
    BLOCKED: "Blocked account",


    REQUIRED_FIELDS_MESSAGE: (fieldCount = 0) =>
      `At least ${fieldCount} field(s) are required.`,
    
    BLOCKED_MESSAGE: (remainingMin = '') =>
      `${MessageConstant.USER.BLOCKED} Try again in ${remainingMin} minute(s).`,

    EMAIL_OR_PASSWORD: (remainingMin = 'or') =>
    `${MessageConstant.USER.INVALID_EMAIL_OR_PASSWORD}  ${remainingMin} email`,
  

  };

  // AUTH messages
  static AUTH = {
    LOGIN_SUCCESS: "Login successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    UNAUTHORIZED: "Unauthorized access",
    TOKEN_REQUIRED: "Token is required",
    INVALID_TOKEN: "Invalid or expired token",
  };

  // COMMON messages
  static COMMON = {
    SERVER_ERROR: "Internal Server Error",
    BAD_REQUEST: "Bad Request",
    FORBIDDEN: "Forbidden",
    VALIDATION_FAILED: "Validation failed",
    INTERNAL_ERROR: "Something went wrong",
    VALIDATION_ERROR: "Validation failed",
  };
}

module.exports = MessageConstant;