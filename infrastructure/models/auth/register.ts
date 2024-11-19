import { z } from 'zod';
import type { Profile } from './profile';

export const userRegisterValidation = z
    .object({
        credentials: z.union([
            z
                .string()
                .min(1, {
                    message: 'Email atau nomor telepon tidak boleh kosong'
                })
                .max(64, {
                    message: 'Email tidak boleh lebih dari 64 karakter'
                })
                .email({ message: 'Email tidak valid!' }),
            z
                .string()
                .min(1, {
                    message: 'Email atau nomor telepon tidak boleh kosong'
                })
                .regex(/^\+62\d{0,11}$/, {
                    message: 'Nomor telepon harus diawali dengan +62'
                })
                .max(14, {
                    message: 'Nomor telepon tidak boleh lebih dari 14 karakter'
                })
        ]),
        password: z
            .string()
            .min(6, { message: 'Password harus lebih dari 6 karakter' }),
        confirmPassword: z.string().min(6, {
            message: 'Konfirmasi password harus lebih dari 6 karakter'
        })
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password dan konfirmasi password harus sama',
        path: ['confirmPassword']
    });

export type UserRegisterForm = z.infer<typeof userRegisterValidation>;

export namespace RegisterType {
    export interface Request extends UserRegisterForm {}
    export interface Response extends Profile.Response {}
}
