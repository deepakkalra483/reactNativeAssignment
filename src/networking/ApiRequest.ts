import axios, {AxiosError, AxiosRequestConfig} from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface ErrorProps {
  message: string;
  status?: number;
  [key: string]: any;
}

export const ApiRequest = async (
  url: string,
  method: 'post' | 'get' | 'put' | 'delete',
  params: Record<string, any> | FormData,
  onLoading: (isLoading: boolean) => void,
  onSuccess: (response: any) => void,
  onFailure: (error: ErrorProps) => void,
) => {
  onLoading(true);
  try {
    const commonParams = {
      _limit: 20,
    };
    let requestData;
    requestData = {
      ...commonParams,
      ...params,
    };
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${url}`,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: method === 'post' ? requestData : undefined,
      params: method === 'get' ? requestData : undefined,
    };
    console.log('urll---', `${JSON.stringify(config)}`);
    const response = await axios(config);
    onLoading(false);
    if (!response?.data?.status && response?.data?.code === 401) {
      onFailure({
        message: `Session Expired`,
        status: 401,
      });
    }
    if (response?.data?.status) {
      onSuccess(response?.data);
    } else {
      onSuccess(response?.data);
    }
  } catch (error) {
    onLoading(false);
    const axiosError = error as AxiosError;
    let errorMessage = 'Something went wrong';
    let errorStatus = axiosError.response?.status || 500;

    if (axiosError.response) {
      errorMessage =
        (axiosError.response.data as {message?: string})?.message ||
        JSON.stringify(axiosError.response.data);
    } else if (axiosError.request) {
      errorMessage = 'No response received from server.';
    } else {
      errorMessage = axiosError.message;
    }
    onFailure({
      message: errorMessage,
      status: errorStatus,
    });
  }
};
