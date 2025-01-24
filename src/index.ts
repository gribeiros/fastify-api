import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import envSchema from './schemas/env.schema.ts'
import prismaPlugin from './plugins/prisma.plugin.ts'
import userRoutes from './routes/user.route.ts'


const server = fastify().withTypeProvider<ZodTypeProvider>();


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
                url: `${server.config.PATH_API}`, // Define o prefixo base
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
    console.log(`Server listening at ${address}`);
});
