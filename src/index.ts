import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import envSchema from './schemas/env.schema.ts'
import prismaPlugin from './plugins/prisma.plugin.ts'
import userRoutes from './routes/user.route.ts'

const server = fastify({
    logger: {
        redact: ['req.headers.authorization'],
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'dd-MM-yyyy HH:MM:ss Z'
            }
        },
        serializers: {
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    headers: request.headers,
                    host: request.host,
                    remoteAddress: request.ip,
                    remotePort: request.socket.remotePort
                }
            }
        }
    }
}).withTypeProvider<ZodTypeProvider>();


server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

await server.register(fastifyEnv, {
    dotenv: true,
    schema: envSchema,
});

server.register(prismaPlugin);

server.register(fastifyCors, {
    origin: '*',
})

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Fastify_API',
            version: '1.0.0'
        },
        servers: [
            {
                url: `/${server.config.PATH_API}`, // Define o prefixo base
                description: 'Base path URL'
            }
        ]
    },
    transform: jsonSchemaTransform
});

server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

server.register(userRoutes, { prefix: `${server.config.PATH_API}` })

server.listen({ port: server.config.PORT }, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server documentation on: ${address}/docs\n`);
});
