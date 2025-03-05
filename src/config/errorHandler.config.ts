import { FastifyReply, FastifyRequest } from "fastify";
import { AppException } from "../error/appException.ts";

const errorHandler = (err: Error, request: FastifyRequest, reply: FastifyReply) => {
    const { log } = request.server;

    if (err instanceof AppException) {
        reply.status(err.details.httpCode).send({
            date: new Date(),
            description: err.details.description,
            message: err.details.message,
            path: err.details.path,
        });
    } else {
        log.error(err);
        reply.status(500).send({
            code: 500,
            message: err.message,
        });
    }
};

export default errorHandler;