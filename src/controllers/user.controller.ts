import { FastifyReply, FastifyRequest } from 'fastify';
import { finUserByIdParamType } from '../schemas/user.shema.ts'

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

    reply.status(200).send(user)
}