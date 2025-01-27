import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

const errorHandler = (err: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    switch (err.code) {
        case 'USER_NOT_FOUND':
            reply.status(404).send({
                code: err.code,
                message: err.message,
            });
            break;
        default:
            reply.status(500).send({
                code: err.code,
                message: err.message,
            });
            break;
    }
}

export default errorHandler