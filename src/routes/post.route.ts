import { FastifyInstance } from "fastify";
import { z } from 'zod';
import { createPost, deletePost, getAllPosts, getPostsById, partialUpdatePost, updatePost } from "../controllers/post.controller.ts";
import { defaultIdParam, defaultResponseSucess } from "../schemas/default.schema.ts";
import { createUpdatePostSchema, defaultPostSchema, listOfPosts, partialUpdatePostSchema } from "../schemas/post.schema.ts";

export default async function postRoutes(server: FastifyInstance) {

    server.route({
        method: "GET",
        url: "/",
        schema: {
            description: 'List of posts',
            tags: ['posts'],
            response: {
                200: listOfPosts
            },
        },
        handler: getAllPosts
    });

    server.route({
        method: "GET",
        url: "/:id",
        schema: {
            description: "Get a post by id",
            tags: ['posts'],
            params: defaultIdParam,
            response: {
                200: defaultPostSchema,
                404: z.object({
                    error: z.boolean(),
                    message: z.string(),
                })
            },
        },
        handler: getPostsById
    });

    server.route({
        method: "POST",
        url: "/create",
        schema: {
            description: 'Create a post',
            tags: ['posts'],
            body: createUpdatePostSchema,
            response: {
                200: defaultResponseSucess
            }

        },
        handler: createPost
    });


    server.route(
        {
            method: "PUT",
            url: "/update/:id",
            schema: {
                description: "Update a post",
                tags: ['posts'],
                params: defaultIdParam,
                body: createUpdatePostSchema,
                response: {
                    200: defaultResponseSucess
                }
            },
            handler: updatePost
        });

    server.route(
        {
            method: "PATCH",
            url: "/update/:id",
            schema: {
                description: "Update a post",
                tags: ['posts'],
                params: defaultIdParam,
                body: partialUpdatePostSchema,
                response: {
                    200: defaultResponseSucess
                }
            },
            handler: partialUpdatePost
        });

    server.route(
        {
            method: "DELETE",
            url: '/delete/:id',
            schema: {
                description: 'Delete a post',
                tags: ['posts'],
                params: defaultIdParam,
                response: {
                    200: defaultResponseSucess
                }
            },
            handler: deletePost

        });

}