import { useMutation, useQueryClient } from "@tanstack/react-query";
import { packerService } from "../../services/packer.service";
import { ApiResponse } from "../../interfaces/api-response.interface";
import { IPacker } from "../../interfaces/packer.interface";
import { ExtendedAxiosError } from "../../interfaces/axios-error.interface";
import { Axios } from "axios";

type AddPackerProps = { 
    name: string ;
    password: string;
}
export const useAddPacker = ({name, password}: AddPackerProps) => {
const client = useQueryClient();
    return useMutation({
        mutationFn: () => packerService.addPacker({name, password}),
        onSuccess: (newPacker) => {
            client.setQueriesData<ApiResponse<IPacker[]>>(['packers'], (oldPackers) => {           
                 if (oldPackers) {
                    return {
                        ...oldPackers,
                        data: [...oldPackers.data, newPacker.data]
                    }
                 }   
                 client.invalidateQueries(['packers']);
            })
        },
        onError: async (error: ExtendedAxiosError ) => {
            if (error instanceof Axios) {
                throw error
            }
        }
    })

}