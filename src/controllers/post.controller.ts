import { FastifyReply, FastifyRequest } from 'fastify';
import { createUpdatePostBodyType, createUpdatePostSchema, partialUpdatePostBodyType, partialUpdatePostSchema } from '../schemas/post.schema.ts';
import { defaultIdParam, defaultIdParamType } from '../schemas/default.schema.ts';


export async function getAllPosts(request: FastifyRequest, reply: FastifyReply) {
    const { prisma, log } = request.server;

    const posts = await prisma.post.findMany({
        include: {
            author: true
        }
    }).catch(e => {
        log.error(e)
        throw new Error(e);
    })
    reply.status(200).send(posts)
}

export async function getPostsById(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
    const { prisma, log } = request.server;
    const { id } = defaultIdParam.parse(request.params);

    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: parseInt(id)
        }, include: {
            author: true
        }
    }).catch(e => {
        log.error(e)
        throw new Error(e);
    })

    reply.status(200).send(post)
}

export async function createPost(request: FastifyRequest<{ Body: createUpdatePostBodyType }>, reply: FastifyReply) {
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
    }).catch(
        e => {
            log.error(e)
            throw new Error(e)
        }
    )

    reply.status(201).send({ message: 'Post created' })
}

export async function updatePost(request: FastifyRequest<{ Body: createUpdatePostBodyType, Params: defaultIdParamType }>, reply: FastifyReply) {
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
    }).catch(e => {
        log.error(e)
        throw new Error(e)
    })

    reply.status(200).send({ message: 'Post updated' })
}

export async function partialUpdatePost(request: FastifyRequest<{ Body: partialUpdatePostBodyType, Params: defaultIdParamType }>, reply: FastifyReply) {
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
    }).catch(e => {
        log.error(e)
        throw new Error(e)
    })

    reply.status(200).send({ message: 'Post updated' })
}

export async function deletePost(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
    const { log, prisma } = request.server;
    const { id } = defaultIdParam.parse(request.params);

    await prisma.post.delete({
        where: {
            id: parseInt(id)
        }
    }).catch(e => {
        log.error(e)
        throw new Error(e)
    })

    reply.status(200).send({ message: 'Post deleted' })
}