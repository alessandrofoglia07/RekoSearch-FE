import { z } from 'zod';

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters long.').max(50, 'Name must be at most 50 characters long.');

export const emailSchema = z.string().email('Invalid email address.');

export const passwordSchema = z.string().min(6, 'Password must be at least 6 characters long.').max(50, 'Password must be at most 50 characters long.').regex(/[a-z]/, 'Password must contain at least one lowercase letter.').regex(/[0-9]/, 'Password must contain at least one number.');

export const formSchemaSubmit = z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
});

export const confirmCodeSchema = z.string().length(6, 'Confirmation code must be 6 characters long.');