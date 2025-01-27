import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.ts";

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
                        email: z.string().email({message: "Pass a valid e-mail"}),
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
            }),
            response: {
                200: z.object(
                    {
                        id: z.number(),
                        email: z.string().email({message: "Pass a valid e-mail"}),
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
            description: 'Create an user',
            tags: ['users'],
            body: z.object({
                name: z.string().nonempty({ message: 'Name not be empty' }),
                email: z.string().email({message: "Pass a valid e-mail"}),
            }),
            response: {
                200: z.object({
                    message: z.string()
                })
            }

        },
        handler: createUser
    })

    server.route(
        {
            method: "PUT",
            url: "/update/:id",
            schema: {
                description: "Update an user",
                tags: ['users'],
                params: z.object({
                    id: z.string().nonempty({ message: 'Id not be null' }),
                }),
                body: z.object({
                    name: z.string().nonempty({ message: 'Name not be empty' }),
                    email: z.string().email({message: "Pass a valid e-mail"}),
                }),
                response: {
                    200: z.object({
                        message: z.string()
                    })
                }
            },
            handler: updateUser
        }
    )

    server.route(
        {
            method: "DELETE",
            url: '/delete/:id',
            schema: {
                description: 'Delete an user',
                tags: ['users'],
                params: z.object({
                    id: z.string().nonempty({ message: 'Id not be null' }),
                }),
                response: {
                    200: z.object({
                        message: z.string()
                    })
                }
            },
            handler: deleteUser

        }
    )
}