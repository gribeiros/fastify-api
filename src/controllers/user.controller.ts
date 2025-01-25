import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserBodyType, finUserByIdParamType } from '../schemas/user.shema.ts'
import { UserNotFoundError } from '../error/user/userErrors.ts';

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const { prisma } = request.server;
    const users = await prisma.user.findMany()
    reply.status(200).send(users)
}

export async function getUserById(request: FastifyRequest<{ Params: finUserByIdParamType }>, reply: FastifyReply) {
    const { prisma } = request.server;
    const { id } = request.params
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    });
    if (!user) {
        throw new UserNotFoundError(id);
    }

    reply.status(200).send(user)
}

export async function createUser(request: FastifyRequest<{ Body: createUserBodyType }>, reply: FastifyReply) {
    const { prisma } = request.server;
    const { name, email } = request.body

    try {
        await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        })
    }
    catch (err) {
        throw new Error("Error to save user")
    }
    reply.status(201).send({ message: 'User created' })

}