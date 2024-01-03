
import axios from 'axios';
import { BASE_ENDPOINT_DEV } from '../constans/baseEndPoint';
import { ApiResponse } from '../interfaces/api-response.interface';
import { TProduct } from '../interfaces/products/products.type';
class ProductService  {
    private baseURl = `${BASE_ENDPOINT_DEV}product`;

    async getProduct (search?: string) {        
        const products = await axios.get<ApiResponse<TProduct[]>>(this.baseURl, {params: {search}});
        return products.data.data;
    }
}

export const productService = new ProductService();