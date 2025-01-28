import { FastifyReply, FastifyRequest } from "fastify";
import { HealthType, healthSchema } from "../schemas/health.schema.ts";

export async function health(request: FastifyRequest, reply: FastifyReply) {
    const { prisma, log } = request.server;

    const databaseStatus = await prisma.$queryRaw`SELECT 1`
        .then(() => { return 'ok' })
        .catch((e) => {
            log.error(e);
            return 'error';
        });

    const healthStatus: HealthType = {
        server: {
            status: 'ok',
        },
        database: {
            status: databaseStatus,
        },
        date: new Date().toISOString(),
    };

    reply.status(200).send(healthStatus);
}