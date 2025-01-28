import { FastifyInstance } from "fastify";
import { createProfile, deleteProfile, getAllProfiles, getProfileById, updateProfile } from "../controllers/profile.controller.ts";
import { defaultIdParam, defaultResponseError, defaultResponseSucess } from "../schemas/default.schema.ts";
import { createUpdateProfileSchema, defaultProfileSchema, listOfProfiles } from "../schemas/profile.schema.ts";

export default async function profileRoutes(server: FastifyInstance) {

    server.route({
        method: "GET",
        url: "/",
        schema: {
            description: 'List of profiles',
            tags: ['profiles'],
            response: {
                200: listOfProfiles
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
                200: defaultProfileSchema,
                404: defaultResponseError
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