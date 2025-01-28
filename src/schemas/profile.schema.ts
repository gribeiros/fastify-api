import { z } from 'zod';

export const createUpdateProfileSchema = z.object({
    bio: z.string().max(20, { message: 'Character limit is 20' }).nonempty({ message: 'Bio not be empty' }),
    user_id: z.number().int()
})

export const defaultProfileSchema = z.object(
    {
        id: z.number(),
        bio: z.string(),
        user: z.object(
            {
                id: z.number(),
                name: z.string(),
                email: z.string().email(),
            }
        ),
    }
)

export const listOfProfiles = z.array(defaultProfileSchema)

export type createUpdateProfileBodyType = z.infer<typeof createUpdateProfileSchema>;