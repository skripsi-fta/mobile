import type { SpesialisasiModel } from '@/infrastructure/models/spesialisasi/spesialisasi';
import type { AxiosInstance } from 'axios';

export class SpesialisasiAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getRecommendation(
        body?: SpesialisasiModel.Request.Recommendation
    ): Promise<SpesialisasiModel.Response.Recommendation> {
        const data =
            await this.api.get<SpesialisasiModel.Response.Recommendation>(
                '/specialization/recommendation',
                { params: body }
            );

        return data.data;
    }
}
