import type { LoginType } from '@/infrastructure/models/auth/login';
import type { RegisterType } from '@/infrastructure/models/auth/register';
import type { AxiosInstance } from 'axios';

export class AuthAPI {
    private api: AxiosInstance;

    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async login(body: LoginType.Request): Promise<LoginType.Response> {
        const data = await this.api.post<LoginType.Response>(
            '/auth/login',
            body
        );

        return data.data;
    }

    async register(body: RegisterType.Request): Promise<RegisterType.Response> {
        const data = await this.api.post<RegisterType.Response>(
            '/auth/register',
            body
        );

        return data.data;
    }
}
