import { FastifyReply, FastifyRequest } from 'fastify';
import { createUpdateProfileBodyType, createUpdateProfileSchema } from '../schemas/profile.schema.ts';
import { defaultIdParam, defaultIdParamType } from '../schemas/default.schema.ts';

export class ProfileController {

    async getAllProfiles(request: FastifyRequest, reply: FastifyReply) {
        const { prisma, log } = request.server;

        const profiles = await prisma.profile.findMany({
            include: {
                user: true
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })
        reply.status(200).send(profiles)
    }

    async getProfileById(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { id } = defaultIdParam.parse(request.params);

        const profile = await prisma.profile.findUniqueOrThrow({
            where: {
                id: parseInt(id)
            }, include: {
                user: true
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send(profile)
    }


    async createProfile(request: FastifyRequest<{ Body: createUpdateProfileBodyType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { bio, user_id } = createUpdateProfileSchema.parse(request.body);

        await prisma.profile.create({
            data: {
                bio: bio,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(201).send({ message: 'Profile created' })
    }

    async updateProfile(request: FastifyRequest<{ Body: createUpdateProfileBodyType, Params: defaultIdParamType }>, reply: FastifyReply) {
        const { prisma, log } = request.server;
        const { bio, user_id } = createUpdateProfileSchema.parse(request.body);
        const { id } = defaultIdParam.parse(request.params);

        await prisma.profile.update({
            where: {
                id: parseInt(id),
            },
            data: {
                bio: bio,
                user: {
                    connect: {
                        id: user_id
                    }
                }
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send({ message: 'Profile updated' })
    }

    async deleteProfile(request: FastifyRequest<{ Params: defaultIdParamType }>, reply: FastifyReply) {
        const { log, prisma } = request.server;
        const { id } = defaultIdParam.parse(request.params);

        await prisma.profile.delete({
            where: {
                id: parseInt(id)
            }
        }).catch((e: Error) => {
            log.error(e)
            throw e;
        })

        reply.status(200).send({ message: 'Profile deleted' })
    }

}