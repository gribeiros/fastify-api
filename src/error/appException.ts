import { ErrorType } from "../schemas/error.schema.ts";

export class AppException extends Error {
    public details: ErrorType;

    constructor(details: ErrorType, name: string) {
        super(details.message);
        this.details = details;
        this.name = name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}