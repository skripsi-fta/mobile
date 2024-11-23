import type { PatientModel } from '@/infrastructure/models/patient/patient';
import type { AxiosInstance } from 'axios';

export class PatientAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async create(
        body: PatientModel.Request.Create
    ): Promise<PatientModel.Response.Create> {
        const data = await this.api.post<PatientModel.Response.Create>(
            '/patient/create',
            body
        );

        return data.data;
    }

    async check(
        body: PatientModel.Request.Check
    ): Promise<PatientModel.Response.Check> {
        const data = await this.api.post<PatientModel.Response.Check>(
            '/patient/check',
            body
        );

        return data.data;
    }

    async link(
        body: PatientModel.Request.Check
    ): Promise<PatientModel.Response.Check> {
        const data = await this.api.post<PatientModel.Response.Check>(
            '/patient/link',
            body
        );

        return data.data;
    }
}
