import { z } from 'zod';

export const healthSchema = z.object({
    server: z.object({
        status: z.string(),
    }),
    database: z.object({
        status: z.string(),
    }),
    date: z.string(),
});

export type HealthType = z.infer<typeof healthSchema>;