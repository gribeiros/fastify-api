import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.ts";
import { defaultIdParam, defaultResponseError, defaultResponseSucess } from "../schemas/default.schema.ts";
import { createUpdateUserSchema } from "../schemas/user.shema.ts";

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
            params: defaultIdParam,
            response: {
                200: z.object(
                    {
                        id: z.number(),
                        email: z.string().email(),
                        name: z.string(),
                    }
                ),
                404: defaultResponseError
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
            body: createUpdateUserSchema,
            response: {
                200: defaultResponseSucess
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
                params: defaultIdParam,
                body: createUpdateUserSchema,
                response: {
                    200: defaultResponseSucess
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
                params: defaultIdParam,
                response: {
                    200: defaultResponseSucess
                }
            },
            handler: deleteUser

        }
    )
}