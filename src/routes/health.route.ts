import { FastifyInstance } from "fastify";
import { health } from "../controllers/health.controller.ts";
import { healthSchema } from "../schemas/health.schema.ts";

export default async function helathRoutes(server: FastifyInstance) {
    server.route({
        method: "GET",
        url: "/health",
        schema: {
            description: 'Healt Check',
            tags: ['health'],
            response: {
                200: healthSchema
            },
        },
        handler: health
    })
}