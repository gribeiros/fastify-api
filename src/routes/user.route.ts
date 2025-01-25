import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { getAllUsers, getUserById } from "../controllers/user.controller.ts";

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

    server.route({
        method: "GET",
        url: "/user/:id",
        schema: {
            description: "Get an user by id",
            tags: ["users"],
            params: z.object({
                id: z.string().nonempty({ message: 'Id not be null' }),
            })
            ,
            response: {
                200: z.object(
                    {
                        id: z.number(),
                        email: z.string().email(),
                        name: z.string(),
                    }
                )
            },
        },
        handler: getUserById
    })


}