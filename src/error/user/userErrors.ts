import { createError } from "@fastify/error"

export const UserNotFoundError = createError(
    'USER_NOT_FOUND',
    'User with ID %s was not found',
    404
);

export const UserNotCreatedError = createError(
    'USER_NOT_CREATED',
    'Error to create User',
    500
);

export const UserNotUpdatedError = createError(
    'USER_NOT_UPDATED',
    'Error to update User',
    500
);

export const UserNotDeletedError = createError(
    'USER_NOT_DELETED',
    'Error to delete User',
    500
);