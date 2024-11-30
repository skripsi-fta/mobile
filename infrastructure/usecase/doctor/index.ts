import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import type { AxiosInstance } from 'axios';

export class DoctorAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getRecommendation(
        body?: DoctorModel.Request.Recommendation
    ): Promise<DoctorModel.Response.Recommendation> {
        const data = await this.api.get<DoctorModel.Response.Recommendation>(
            '/doctor/recommendation',
            { params: body }
        );

        return data.data;
    }

    async getDoctor(
        body: DoctorModel.Request.List
    ): Promise<DoctorModel.Response.List> {
        const data = await this.api.get('/doctor', {
            params: body
        });

        return data.data.data;
    }
}
