import { z } from 'zod';
import type { Profile } from './profile';

export const baseUserEmailValidation = z.object({
    username: z
        .string()
        .min(1, 'Email / Nomor Telepon tidak boleh kosong')
        .max(255, 'Email / Nomor Telepon maksimal 255 karakter')
});

export const userLoginValidation = z
    .object({
        password: z.string().min(1, 'Password tidak boleh kosong')
    })
    .merge(baseUserEmailValidation);

export type UserLoginForm = z.infer<typeof userLoginValidation>;

export namespace LoginType {
    export interface Request extends UserLoginForm {}
    export interface Response extends Profile.Response {}
}
