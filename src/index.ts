import fastify from "fastify";
import fastifyEnv from "@fastify/env";
import envSchema from './schemas/env.schema.ts'

const server = fastify();


server.get("/ping", async (req, res) => {
    return "pong\n";
});




await server.register(fastifyEnv, {
    dotenv: true,
    schema: envSchema,
});


server.listen({ port: server.config.PORT }, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
