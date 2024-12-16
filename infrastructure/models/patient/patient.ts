import { z } from 'zod';
import type { Profile } from '../auth/profile';

export const createPatientValidation = z.object({
    nama: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nama tidak boleh kosong' })
        .max(64, { message: 'Nama tidak boleh lebih dari 64 karakter' }),
    gender: z.enum(['MALE', 'FEMALE'], {
        errorMap: () => ({ message: 'Gender tidak valid' })
    }),
    address: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Alamat tidak boleh kosong' })
        .max(128, { message: 'Alamat tidak boleh lebih dari 128 karakter' }),
    dateOfBirth: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Tanggal Lahir tidak boleh kosong' })
        .max(128, {
            message: 'Tanggal Lahir tidak boleh lebih dari 128 karakter'
        }),
    idType: z.enum(['PASSPORT', 'DRIVER_LICENSE', 'NATIONAL_ID'], {
        errorMap: () => ({ message: 'Tipe Identitas tidak valid' })
    }),
    idNumber: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nomor Identitas tidak boleh kosong' })
        .max(128, {
            message: 'Nomor Identitas tidak boleh lebih dari 128 karakter'
        })
});

export type CreatePatientValidation = z.infer<typeof createPatientValidation>;

export const checkPatientValidation = z.object({
    idType: z.enum(['PASSPORT', 'DRIVER_LICENSE', 'NATIONAL_ID'], {
        errorMap: () => ({ message: 'Tipe Identitas tidak valid' })
    }),
    idNumber: z
        .string({ required_error: 'required' })
        .min(1, { message: 'Nomor Identitas tidak boleh kosong' })
        .max(128, {
            message: 'Nomor Identitas tidak boleh lebih dari 128 karakter'
        })
});

export type CheckPatientValidation = z.infer<typeof checkPatientValidation>;

export namespace PatientModel {
    export namespace Request {
        export interface Create extends CreatePatientValidation {}

        export interface Check extends CheckPatientValidation {}
    }

    export namespace Response {
        export interface Data {
            id: number;
            name: string;
            address: string;
            dateOfBirth: string;
            gender: 'MALE' | 'FEMALE';
            idType: 'PASSPORT' | 'DRIVER_LICENSE' | 'NATIONAL_ID';
            idNumber: string;
        }

        export interface Create {
            data: Profile.UserData;
            message: string;
        }

        export interface Check {
            data: Data;
            message: string;
        }
    }
}
