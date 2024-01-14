
import { ApiResponse } from '../interfaces/api-response.interface';
import { TProduct } from '../interfaces/products/products.type';
import { api } from './api/axiosConfig';
class ProductService  {
    private productPath = 'product';

    async getProduct (search?: string) {        
        const products = await api.get<ApiResponse<TProduct[]>>(this.productPath, {params: {search}});
        return products.data.data;
    }
}

export const productService = new ProductService();