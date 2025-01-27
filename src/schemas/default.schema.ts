import { z } from 'zod';

export const defaultIdParam = z.object({ id: z.string().nonempty({ message: 'Id not be null' }) })
export const defaultResponseSucess = z.object({ message: z.string() })
export const defaultResponseError = z.object({ code: z.string(), message: z.string() })

export type defaultIdParamType = z.infer<typeof defaultIdParam>;