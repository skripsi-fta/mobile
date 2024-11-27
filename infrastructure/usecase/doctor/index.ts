import type { DoctorModel } from '@/infrastructure/models/doctor/doctor';
import type { AxiosInstance } from 'axios';

export class DoctorAPi {
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
}
