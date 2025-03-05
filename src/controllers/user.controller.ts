import { FastifyReply, FastifyRequest } from 'fastify';
import { createUpdateUserBodyType, createUpdateUserSchema } from '../schemas/user.shema.ts'
import { UserNotCreatedException, UserNotFoundException, UserNotUpdatedException, UserNotDeletedException } from '../error/user/userErrors.ts';
import { defaultIdParam, defaultIdParamType } from '../schemas/default.schema.ts';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';


export class UserController {

    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const users = await prisma.user.findMany().catch((e: Error) => {
            log.error(e)
            throw e;
        })
        reply.status(200).send(users)
    }

    async getUserById(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { id } = defaultIdParam.parse(request.params);

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            }
        }).catch((e: PrismaClientKnownRequestError) => {
            log.error(e);
            
            if(e.code == 'P2025')
            throw new UserNotFoundException({ httpCode: 404, description: "USER_NOT_FOUND", message: `Not found user with id: ${id}`, path: request.url })
        })

        reply.status(200).send(user)
    }

    async createUser(request: FastifyRequest<{ Body: createUpdateUserBodyType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { name, email } = createUpdateUserSchema.parse(request.body)

        await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        }).catch((e: Error) => {
            log.error(e)
            throw new UserNotCreatedException({ httpCode: 500, description: "USER_NOT_CREATED", message: "Not created", path: request.url })
        })

        reply.status(201).send({ message: 'User created' })
    }

    async updateUser(request: FastifyRequest<{ Params: defaultIdParamType, Body: createUpdateUserBodyType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { name, email } = createUpdateUserSchema.parse(request.body)
        const { id } = defaultIdParam.parse(request.params);

        await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name: name,
                email: email
            }
        }).catch((e: Error) => {
            log.error(e)
            throw new UserNotUpdatedException({ httpCode: 500, description: "USER_NOT_UPDATED", message: "Not updated with id: " + id, path: request.url })
        })

        reply.status(200).send({ message: "User updated" })
    }


    async deleteUser(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { id } = defaultIdParam.parse(request.params)

        await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        }).catch((e: Error) => {
            log.error(e)
            throw new UserNotDeletedException({ httpCode: 500, description: "USER_NOT_DELETED", message: "Not deleted", path: request.url })
        })

        reply.status(200).send({ message: "User deleted" })
    }



}