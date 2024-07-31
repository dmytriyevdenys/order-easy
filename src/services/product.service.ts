
import { ApiResponse } from '../types/api-response.interface';
import { TProduct } from '../types/products/products.type';
import { api } from '../config/api/axiosConfig';
class ProductService  {
    private productPath = 'product';

    async getProduct (search?: string) {        
        const products = await api.get<ApiResponse<TProduct[]>>(this.productPath, {params: {search}});
        return products.data.data;
    }
}

export const productService = new ProductService();