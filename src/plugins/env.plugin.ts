declare module "fastify" {
    interface FastifyInstance {
        config: {
            PORT: number;
            PATH_API: string;
        };
    }
}