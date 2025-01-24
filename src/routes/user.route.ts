import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { getAllUsers } from "../controllers/user.controller.ts";

export default async function userRoutes(server: FastifyInstance) {

    server.route({
        method: "GET",
        url: "/users",     
        schema: {
            description: 'List of users',
            tags: ['users'],
            response: {
                200: z.array(z.object(
                    {
                        id: z.number(),
                        name: z.string(),
                        email: z.string().email(),
                    }
                ))
            },
        },
        handler: getAllUsers
    }
    );


}