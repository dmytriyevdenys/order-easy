import { useQuery } from "@tanstack/react-query"
import { productService } from "../../services/product.service"
import { CACHE_TIME, STALE_TIME } from "config/cacheConfig"

export const useGetProductsToOrder = (search?: string) => {
    
    return useQuery({
        queryKey: ['products', search],
        queryFn: () =>  productService.getProduct(search),   
        cacheTime: CACHE_TIME,
        staleTime: STALE_TIME
    })
}