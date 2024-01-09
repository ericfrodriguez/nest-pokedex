import { Injectable } from '@nestjs/common';
import { IHttpAdapter } from './interfaces/http-adapter.interface';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

@Injectable()
export class HttpAdapter implements IHttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data }: AxiosResponse<T> = await this.axios.get<T>(url);
            return data;
        } catch (error) {
            throw new Error('Error making http request - Check server logs');
        }
    }
}
