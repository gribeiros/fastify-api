import { ErrorType } from "../../schemas/error.schema.ts";
import { AppException } from "../appException.ts";


export class UserNotFoundException extends AppException {
    constructor(details: ErrorType) {
        super(details, "UserNotFoundException");
    }
}

export class UserNotCreatedException extends AppException {
    constructor(details: ErrorType) {
        super(details, "UserNotCreatedException");
    }
}

export class UserNotUpdatedException extends AppException {
    constructor(details: ErrorType) {
        super(details, "UserNotUpdatedException");
    }
}

export class UserNotDeletedException extends AppException {
    constructor(details: ErrorType) {
        super(details, "UserNotDeletedException");
    }
}