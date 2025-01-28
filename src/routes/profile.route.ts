import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { createProfile, deleteProfile, getAllProfiles, getProfileById, updateProfile } from "../controllers/profile.controller.ts";
import { defaultIdParam, defaultResponseSucess } from "../schemas/default.schema.ts";
import { createUpdateProfileSchema } from "../schemas/profile.schema.ts";

export default async function profileRoutes(server: FastifyInstance) {

    server.route({
        method: "GET",
        url: "/",
        schema: {
            description: 'List of profiles',
            tags: ['profiles'],
            response: {
                200: z.array(z.object(
                    {
                        id: z.number(),
                        bio: z.string(),
                        user: z.object(
                            {
                                id: z.number(),
                                name: z.string(),
                                email: z.string().email(),
                            }
                        ),
                    }
                ))
            },
        },
        handler: getAllProfiles
    }
    );

    server.route({
        method: "GET",
        url: "/:id",
        schema: {
            description: "Get a profile by id",
            tags: ['profiles'],
            params: defaultIdParam,
            response: {
                200: z.object(
                    {
                        id: z.number(),
                        bio: z.string(),
                        user: z.object(
                            {
                                id: z.number(),
                                name: z.string(),
                                email: z.string().email(),
                            }
                        ),
                    }
                ),
                404: z.object({
                    error: z.boolean(),
                    message: z.string(),
                })
            },
        },
        handler: getProfileById
    });

    server.route({
        method: "POST",
        url: "/create",
        schema: {
            description: 'Create a profile',
            tags: ['profiles'],
            body: createUpdateProfileSchema,
            response: {
                200: defaultResponseSucess
            }

        },
        handler: createProfile
    });

    server.route(
        {
            method: "PUT",
            url: "/update/:id",
            schema: {
                description: "Update a profile",
                tags: ['profiles'],
                params: defaultIdParam,
                body: createUpdateProfileSchema,
                response: {
                    200: defaultResponseSucess
                }
            },
            handler: updateProfile
        });

    server.route(
        {
            method: "DELETE",
            url: '/delete/:id',
            schema: {
                description: 'Delete a profile',
                tags: ['profiles'],
                params: defaultIdParam,
                response: {
                    200: defaultResponseSucess
                }
            },
            handler: deleteProfile

        });
}