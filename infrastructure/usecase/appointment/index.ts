import type { AppointmentModel } from '@/infrastructure/models/appointment/appointment';
import type { AxiosInstance } from 'axios';

export class AppointmentAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async create(
        body: AppointmentModel.Request.Create
    ): Promise<AppointmentModel.Response.Create> {
        const data = await this.api.post<AppointmentModel.Response.Create>(
            '/appointment/create',
            body
        );

        return data.data;
    }

    async getList(
        body: AppointmentModel.Request.List
    ): Promise<AppointmentModel.Response.List> {
        const data = await this.api.get('/appointment', {
            params: body
        });

        return data.data.data;
    }

    async getDetail(
        body: AppointmentModel.Request.Detail
    ): Promise<AppointmentModel.Response.Detail> {
        const data = await this.api.get('/appointment/detail', {
            params: body
        });

        return data.data.data;
    }

    async getQueue(
        body: AppointmentModel.Request.Queue
    ): Promise<AppointmentModel.Response.Queue> {
        const data = await this.api.get('/appointment/queue', {
            params: body
        });

        return data.data.data;
    }

    async createRating(
        body: AppointmentModel.Request.Rating
    ): Promise<AppointmentModel.Response.Rating> {
        const data = await this.api.post('/appointment/rating', body);

        return data.data;
    }
}
