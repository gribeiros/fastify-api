import { z } from 'zod';

const finUserByIdSchema = z.object({ id: z.string() })
const createUserSchema = z.object({
    name: z.string().max(80, { message: 'Character limit is 80' }).nonempty({ message: 'Name not be empty' }),
    email: z.string().email({ message: "Pass a valid e-mail" }),
})

export type createUserBodyType = z.infer<typeof createUserSchema>;
export type finUserByIdParamType = z.infer<typeof finUserByIdSchema>;