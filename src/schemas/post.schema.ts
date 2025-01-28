import { z } from 'zod';

export const createUpdatePostSchema = z.object({
    title: z.string(),
    content: z.string().optional(),
    published: z.boolean(),
    author_id: z.number().int()
})

export const partialUpdatePostSchema = z.object({
    title: z.string(),
    content: z.string().optional(),
    published: z.boolean()
})

export const defaultPostSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    content: z.string().optional(),
    published: z.boolean(),
    author: z.object({ email: z.string().email(), name: z.string() }),
    createdAt: z.date(),
    updatedAt: z.date()
})

export const listOfPosts = z.array(defaultPostSchema)

export type createUpdatePostBodyType = z.infer<typeof createUpdatePostSchema>;

export type partialUpdatePostBodyType = z.infer<typeof partialUpdatePostSchema>;