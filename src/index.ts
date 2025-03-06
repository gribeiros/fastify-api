import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import dotenv from 'dotenv';

import envSchema from './schemas/env.schema.ts'
import loggerConfig from './config/logger.config.ts'
import prismaPlugin from './plugins/prisma.plugin.ts'
import userRoutes from './routes/user.route.ts'
import errorHandler from './config/errorHandler.config.ts'
import profileRoutes from "./routes/profile.route.ts";
import postRoutes from "./routes/post.route.ts";
import helathRoutes from "./routes/health.route.ts";

dotenv.config()

const server = fastify({ logger: loggerConfig }).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

await server.register(fastifyEnv, { schema: envSchema, dotenv: true, confKey: 'config' });

const { PATH_API, PORT } = server.config;

server.register(prismaPlugin);

server.register(fastifyCors, { origin: '*', })

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Fastify_API',
            version: '1.0.0'
        },
        servers: [{
            url: `/${PATH_API}`,
            description: 'Base path URL'
        }]
    },
    transform: jsonSchemaTransform,
    logLevel: 'silent'
});

server.register(fastifySwaggerUi, { routePrefix: '/docs', logLevel: "silent" })

server.setErrorHandler(errorHandler)

server.register(userRoutes, { prefix: `${PATH_API}/users` })
server.register(profileRoutes, { prefix: `${PATH_API}/profiles` })
server.register(postRoutes, { prefix: `${PATH_API}/post` })

server.register(helathRoutes, { prefix: `${PATH_API}` })

server.listen({ host: 'localhost', port: PORT }, (error, address) => {
    if (error) {
        server.log.error(error);
        process.exit(1);
    }
    server.log.info(`Server documentation on: ${address}/docs`);
    server.log.info(`Server healthcheck on: ${address}/health`);
    server.log.info(server.printRoutes())
});
