import { z } from 'zod';

export const createUpdateUserSchema = z.object({
    name: z.string().max(80, { message: 'Character limit is 80' }).nonempty({ message: 'Name not be empty' }),
    email: z.string().email({ message: "Pass a valid e-mail" }),
})

export const defaultUserSchema = z.object(
    {
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    }
)

export const listOfUsers = z.array(defaultUserSchema)

export type createUpdateUserBodyType = z.infer<typeof createUpdateUserSchema>;