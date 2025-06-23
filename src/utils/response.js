// utils/Status.js
class Status {
    constructor(description, code = 'OK', status = 'Success') {
        this.description = description;
        this.code = code;
        this.status = status;
    }

    static success(description = 'Request successful') {
        return new Status(description, 'OK', 'Success');
    }

    static getGeneralResponse(res, data, description = 'Request successful') {
        res.status(201).json({ data, status: this.success(description) });
    }

    static error(res,data,description = 'Something went wrong') {
       res.status(400).json({ Status:this.notFound(description)});
    }

    static notFound(description = 'Resource not found') {
        return new Status(description, 'NOT_FOUND', 'Fail');
    }

    static unauthorized(description = 'Unauthorized access') {
        return new Status(description, 'UNAUTHORIZED', 'Fail');
    }

    static custom(description, code, status) {
        return new Status(description, code, status);
    }
}

module.exports = Status;
