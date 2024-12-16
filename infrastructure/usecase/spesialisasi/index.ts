import type { SpesialisasiModel } from '@/infrastructure/models/spesialisasi/spesialisasi';
import type { AxiosInstance } from 'axios';

export class SpesialisasiAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getSpecialization(
        body: SpesialisasiModel.Request.List
    ): Promise<SpesialisasiModel.Response.List> {
        const data = await this.api.get('/specialization', {
            params: body
        });

        return data.data.data;
    }
}
