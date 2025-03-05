import { FastifyReply, FastifyRequest } from 'fastify';
import { createUpdatePostBodyType, createUpdatePostSchema, partialUpdatePostBodyType, partialUpdatePostSchema } from '../schemas/post.schema.ts';
import { defaultIdParam, defaultIdParamType } from '../schemas/default.schema.ts';


export class PostController {

    async getAllPosts(request: FastifyRequest, reply: FastifyReply) {
        const { prisma, log } = request.server;

        const posts = await prisma.post.findMany({
            include: {
                author: true
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })
        reply.status(200).send(posts)
    }

    async getPostsById(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { id } = defaultIdParam.parse(request.params);

        const post = await prisma.post.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            }, include: {
                author: true
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send(post)
    }

    async createPost(request: FastifyRequest<{ Body: createUpdatePostBodyType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { author_id, published, title, content } = createUpdatePostSchema.parse(request.body);

        await prisma.post.create({
            data: {
                author: {
                    connect: {
                        id: author_id,
                    }
                },
                title: title,
                published: published,
                content: content
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(201).send({ message: 'Post created' })
    }

    async updatePost(request: FastifyRequest<{ Body: createUpdatePostBodyType, Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { author_id, published, title, content } = createUpdatePostSchema.parse(request.body);
        const { id } = defaultIdParam.parse(request.params);

        await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                author: {
                    connect: {
                        id: author_id,
                    }
                },
                content: content,
                published: published,
                title: title

            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send({ message: 'Post updated' })
    }

    async partialUpdatePost(request: FastifyRequest<{ Body: partialUpdatePostBodyType, Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { published, title, content } = partialUpdatePostSchema.parse(request.body);
        const { id } = defaultIdParam.parse(request.params);

        await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                content: content,
                published: published,
                title: title
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send({ message: 'Post updated' })
    }

    async deletePost(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
        const { log, prisma } = request.server;
        const { id } = defaultIdParam.parse(request.params);

        await prisma.post.delete({
            where: {
                id: parseInt(id)
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send({ message: 'Post deleted' })
    }

}

