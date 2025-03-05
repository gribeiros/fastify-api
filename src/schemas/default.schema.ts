import { describe } from 'node:test';
import { z } from 'zod';

export const defaultIdParam = z.object({ id: z.string().nonempty({ message: 'Id not be null' }) })
export const defaultResponseSucess = z.object({ message: z.string() })
export const defaultResponseError = z.object({
    date: z.date({ required_error: "Date is required" }),
    description: z.string({ required_error: "Description is required" }),
    message: z.string({ required_error: "Message is required" }),
    path: z.string({ required_error: "Path is required" })
})

export type defaultIdParamType = z.infer<typeof defaultIdParam>;