/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, Canceler, isCancel } from "axios";
import { useEffect, useRef, useState } from "react";
import { useRootContext } from "~/context/root-context";
import useFn from "../react/useFn";
import {
  CallbackType,
  RequestParamsType,
  RequestReturnType,
  UseHttpRequestParamsType,
  UseHttpRequestReturnType,
} from "./types";

type ResponseDataType = any;

const useHttpRequest = ({
  useLoading = true,
  defaultLoadingState = false,
  baseUrl: defaultBaseUrl,
  path: defaultPath = "",
  query: defaultQuery = {},
  body: defaultBody = {},
  config: reqConfig = {},
  callback: defaultCallback = () => {},
  method: defaultMethod = "GET",
  reqHeaders = {},
}: UseHttpRequestParamsType<ResponseDataType>): UseHttpRequestReturnType<ResponseDataType> => {
  const { backendUrl } = useRootContext();

  const cancelRef = useRef<Canceler>();

  // eslint-disable-next-line import/no-named-as-default-member
  const { CancelToken } = axios;

  const [isLoading, setIsLoading] = useState(defaultLoadingState);

  const handleResponse = (
    response: RequestReturnType<ResponseDataType>,
    callback?: CallbackType<ResponseDataType>
  ) => {
    const { error, data } = response;

    if (callback) callback(error, data);

    return useLoading && !isCancel(error) && setIsLoading(false);
  };

  const request = useFn(
    async (
      ...params: RequestParamsType<ResponseDataType>
    ): Promise<RequestReturnType<ResponseDataType>> => {
      const callback =
        typeof params[params.length - 1] === "function"
          ? (params[params.length - 1] as CallbackType<ResponseDataType>)
          : defaultCallback;

      const {
        method = defaultMethod,
        baseUrl = defaultBaseUrl || backendUrl,
        body = defaultBody,
        path = defaultPath,
        config = reqConfig,
        query = defaultQuery,
      } = typeof params[0] === "object" ? params[0] : {};

      try {
        if (useLoading) setIsLoading(true);

        const response = await axios({
          method: method,
          baseURL: baseUrl,
          data: body,
          params: query,
          url: path,
          withCredentials: true,
          headers: {
            "x-api-key": window.process.env.API_KEY,
            ...reqHeaders,
          },
          signal: new AbortController().signal,
          cancelToken: new CancelToken((c) => {
            cancelRef.current = c;
          }),
          ...config,
        });

        handleResponse(response, callback);

        return response;
      } catch (error) {
        const axiosError = error as AxiosError;
        handleResponse({ error: axiosError }, callback);
        return { error: axiosError };
      }
    }
  );

  useEffect(function cancelReqWhenUnmounting() {
    return () => {
      if (cancelRef.current) cancelRef.current();
    };
  }, []);

  return { request, isLoading };
};

export default useHttpRequest;
