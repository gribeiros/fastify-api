import { z } from 'zod';

const finUserByIdSchema = z.object({ id: z.string() })

export type finUserByIdParamType = z.infer<typeof finUserByIdSchema>;