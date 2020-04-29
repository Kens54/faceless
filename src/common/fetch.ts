import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
// import { useToken } from '@hooks/useToken';

const API: string =
  process.env.NODE_ENV === 'development'
    ? 'http://faceless-api.service.faceless-staging.consul'
    : 'https://api.faceless.me';

// const API: string = 'http://faceless-api.service.faceless-staging.consul';

export const get = (method: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return axios.get(`${API}${method}`, options);
};

export const post = (method: string, options: object | null, headers?: object): Promise<AxiosResponse> => {
  return axios.post(`${API}${method}`, options, headers);
};
