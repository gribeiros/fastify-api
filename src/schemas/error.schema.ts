import path from 'path';
import { z } from 'zod';


export const errorSchema = z.object({
    httpCode: z.number({ required_error: "HttpCode is required" }).int(),
    description: z.string({ required_error: "Description is required" }),
    message: z.string({ required_error: "Message is required" }),
    path: z.string({ required_error: "Path is required" }),
})

export type ErrorType = z.infer<typeof errorSchema>;