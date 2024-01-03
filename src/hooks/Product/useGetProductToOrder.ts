import { useQuery } from "@tanstack/react-query"
import { productService } from "../../services/product.service"

export const useGetProductsToOrder = (search?: string) => {
    
    return useQuery({
        queryKey: ['products', search],
        queryFn: () =>  productService.getProduct(search),
    })
}