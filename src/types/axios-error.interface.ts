import { AxiosError, AxiosResponse } from "axios";

export type ServerError = {
    message: string;
  }
  
  export interface ExtendedAxiosError<T = any> extends AxiosError {
    response: AxiosResponse<T> & {
      data: ServerError; 
    };
  }