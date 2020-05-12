import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ISuccessRefreshTokenResponse } from '@src/types/api/refresh_token';
// import { useToken } from '@hooks/useToken';

const API: string =
  process.env.NODE_ENV === 'development'
    ? 'http://faceless-api.service.faceless-staging.consul'
    : 'https://api.faceless.me';

// const API: string = 'http://faceless-api.service.faceless-staging.consul';

interface IGetParams {
  method: string;
  options?: AxiosRequestConfig;
  authErrorCallback?: (error?: any) => void;
  successCallback?: (value: AxiosResponse) => void;
  errorCallback?: (error: any) => void;
}

interface IPostParams {
  method: string;
  options: object;
  headers?: object;
  authErrorCallback?: (error?: any) => void;
  successCallback?: (value: AxiosResponse) => void;
  errorCallback?: (error: any) => void;
}

// export const get = (method: string, options?: AxiosRequestConfig): Promise<AxiosResponse> => {
//   return axios.get(`${API}${method}`, options);
// };

const refreshToken = async (authErrorCallback?: () => void, successCallback?: () => void) => {
  const localstorageToken = window.localStorage.getItem('token');
  const token = localstorageToken ? JSON.parse(localstorageToken) : null;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .get(`${API}/refresh_token`, options)
    .then((res: AxiosResponse<ISuccessRefreshTokenResponse>) => {
      if (res.data.code === 200) {
        window.localStorage.setItem('token', JSON.stringify(res.data.payload.token));
        if (successCallback) {
          successCallback();
        }
      }
    })
    .catch(() => {
      if (authErrorCallback) {
        authErrorCallback();
      }
    });
};

export const get = async ({ method, options = {}, authErrorCallback, successCallback, errorCallback }: IGetParams) => {
  const localstorageToken = window.localStorage.getItem('token');
  const token = localstorageToken ? JSON.parse(localstorageToken) : null;

  const headers = token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : { 'Content-Type': 'application/json' };

  const allOptions = options.headers
    ? { ...options, headers: { ...headers, ...options.headers } }
    : { ...options, headers };

  try {
    const response = await axios.get(`${API}${method}`, allOptions);
    if (successCallback) {
      successCallback(response);
    }
  } catch (error) {
    if (error.response.data.code === 401) {
      if (token === null) {
        if (authErrorCallback) {
          authErrorCallback(error);
        }
      } else {
        refreshToken(authErrorCallback, () => get({ method, options, successCallback }));
      }
    } else if (errorCallback) {
      errorCallback(error);
    }
  }
};

export const post = async ({
  method,
  options = {},
  headers = {},
  successCallback,
  authErrorCallback,
  errorCallback,
}: IPostParams) => {
  const localstorageToken = window.localStorage.getItem('token');
  const token: string | null = localstorageToken ? JSON.parse(localstorageToken) : null;

  const allHeaders = token
    ? {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : { ...headers, 'Content-Type': 'application/json' };

  try {
    const response = await axios.post(`${API}${method}`, options, { headers: allHeaders });
    if (successCallback) {
      successCallback(response);
    }
  } catch (error) {
    if (error.response.data.code === 401) {
      if (token === null) {
        if (authErrorCallback) {
          authErrorCallback(error);
        }
      } else {
        refreshToken(authErrorCallback, () => post({ method, options, headers, successCallback }));
      }
    } else if (errorCallback) {
      errorCallback(error);
    }
  }
};
