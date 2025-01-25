import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { createUser, getAllUsers, getUserById } from "../controllers/user.controller.ts";

export default async function userRoutes(server: FastifyInstance) {

    server.route({
        method: "GET",
        url: "/",
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
        url: "/:id",
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
                ),
                404: z.object({
                    error: z.boolean(),
                    message: z.string(),
                })
            },
        },
        handler: getUserById
    })

    server.route({
        method: "POST",
        url: "/create",
        schema: {
            description: 'Create user',
            tags: ['users'],
            body: z.object({
                name: z.string().nonempty({ message: 'Name not be empty' }),
                email: z.string().email(),
            }),
            response: {
                200: z.object({
                    message:z.string()
                })
            }

        },
        handler: createUser
    })
}