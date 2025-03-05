import { FastifyInstance } from "fastify";
import { PostController } from "../controllers/post.controller.ts";
import { defaultIdParam, defaultResponseError, defaultResponseSucess } from "../schemas/default.schema.ts";
import { createUpdatePostSchema, defaultPostSchema, listOfPosts, partialUpdatePostSchema } from "../schemas/post.schema.ts";

export default async function postRoutes(server: FastifyInstance) {

    const postController = new PostController();

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
        handler: postController.getAllPosts
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
                404: defaultResponseError
            },
        },
        handler: postController.getPostsById
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
        handler: postController.createPost
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
            handler: postController.updatePost
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
            handler: postController.partialUpdatePost
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
            handler: postController.deletePost

        });

}