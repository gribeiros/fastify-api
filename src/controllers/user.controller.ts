import { FastifyReply, FastifyRequest } from 'fastify';

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    const { prisma } = request.server;
    const users = await prisma.user.findMany()
    reply.status(200).send(users)
}