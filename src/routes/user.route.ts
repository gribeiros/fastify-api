import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller.ts";
import { defaultIdParam, defaultResponseError, defaultResponseSucess } from "../schemas/default.schema.ts";
import { createUpdateUserSchema, defaultUserSchema, listOfUsers } from "../schemas/user.shema.ts";

export default async function userRoutes(server: FastifyInstance) {

    const userController = new UserController();

    server.route({
        method: "GET",
        url: "/",
        schema: {
            description: 'List of users',
            tags: ['users'],
            response: {
                200: listOfUsers
            },
        },
        handler: userController.getAllUsers
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
                200: defaultUserSchema,
                404: defaultResponseError
            },
        },
        handler: userController.getUserById
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
        handler: userController.createUser
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
            handler: userController.updateUser
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
            handler: userController.deleteUser

        }
    )
}