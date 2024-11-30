import type { ScheduleModel } from '@/infrastructure/models/schedule/schedule';
import type { AxiosInstance } from 'axios';

export class ScheduleAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getSchedule(
        body: ScheduleModel.Request.List
    ): Promise<ScheduleModel.Response.List> {
        const data = await this.api.get('/schedule', { params: body });

        return data.data.data;
    }
}
