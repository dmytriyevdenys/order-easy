import { AxiosError } from "axios";
import { ExtendedAxiosError } from "types/axios-error.interface";

export const handleAxiosError = (error: ExtendedAxiosError) => {
    if (error instanceof AxiosError) {
        throw error;
      }
}