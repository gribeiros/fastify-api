import { createError } from "@fastify/error"

export const UserNotFoundError = createError(
    'USER_NOT_FOUND',
    'User with ID %s was not found',
    404
);