import { z } from 'zod';

export const createUpdateProfileSchema = z.object({
    bio: z.string().max(20, { message: 'Character limit is 20' }).nonempty({ message: 'Bio not be empty' }),
    user_id: z.number().int()
})

export type createUpdateProfileBodyType = z.infer<typeof createUpdateProfileSchema>;