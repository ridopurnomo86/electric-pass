/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

type RequestOptionsType = {
  method?: string;
  baseUrl?: string;
  body?: { [key: string]: any };
  path?: string;
  config?: AxiosRequestConfig;
  query?: { [key: string]: any };
};
export type CallbackType<ResponseDataType> = (
  error: AxiosError | undefined,
  data?: ResponseDataType
) => void;

export type RequestReturnSuccessType<ResponseDataType> = AxiosResponse<ResponseDataType>;

export type RequestReturnErrorType = { error?: AxiosError | any };

export type RequestReturnType<ResponseDataType> = Partial<
  RequestReturnSuccessType<ResponseDataType>
> &
  RequestReturnErrorType;

export type RequestParamsType<ResponseDataType> = [
  RequestOptionsType?,
  CallbackType<ResponseDataType>?,
];

export type UseHttpRequestParamsType<ResponseDataType> = {
  method?: string;
  path: string;
  body?: any;
  query?: { [key: string]: any };
  baseUrl?: string;
  config?: { [key: string]: any };
  callback?: CallbackType<ResponseDataType>;
  defaultLoadingState?: boolean;
  useLoading?: boolean;
  reqHeaders?: { [key: string]: any };
};

export type UseHttpRequestReturnType<ResponseDataType> = {
  request: (
    ...params: RequestParamsType<ResponseDataType>
  ) => Promise<RequestReturnType<ResponseDataType>>;
  isLoading: boolean;
};
