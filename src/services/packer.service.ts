import axios from "axios";
import { IPacker } from "../interfaces/packer.interface";
import {
  ApiResponse,
  ApiResponsePagination,
} from "../interfaces/api-response.interface";
import { IntDoc } from "../interfaces/int-doc.type";
import { TScanIntDoc } from "../interfaces/packer/scan-int-doc.type";
import { BASE_ENDPOINT_DEV } from "../constans/baseEndPoint";

class PackerService {
  private baseUrl = `${BASE_ENDPOINT_DEV}packer`;
  private baseUrlIntDoc = `${BASE_ENDPOINT_DEV}internet-document`;

  async getAllPackers() {
    const packers = await axios.get<ApiResponse<IPacker[]>>(this.baseUrl);
    return packers.data;
  }

  async getIntDocs({
    packerId,
    options = {},
    pageUrl,
  }: {
    packerId?: number;
    options?: { limit?: number; page?: number; filter?: string; search?: string };
    pageUrl?: string;
  } = {}): Promise<ApiResponsePagination<IntDoc[]>> {
    let url;
    pageUrl
      ? (url = pageUrl)
      : (url = packerId
          ? `${this.baseUrlIntDoc}?packerId=${packerId}`
          : this.baseUrlIntDoc);

    const response = await axios.get<ApiResponsePagination<IntDoc[]>>(url, {
      params: options,
    });

    return response.data;
  }

  async checkPacker(
    id: number,
    password: { password: string }
  ): Promise<IPacker> {
    const response = await axios.post<ApiResponse<IPacker>>(
      `${this.baseUrl}/${id}`,
      password
    );
    return response.data.data;
  }

  async addPacker ({name, password}: {name: string, password: string}) {
     const response = await axios.post<ApiResponse<IPacker>>(this.baseUrl, {name, password});
     return response.data;
  }

  async scanIntDoc(
    id: number,
    intDoc: TScanIntDoc
  ): Promise<ApiResponsePagination<IntDoc>> {
    
    const response = await axios.post<ApiResponsePagination<IntDoc>>(
      `${this.baseUrl}/${id}/scan/`,
      intDoc
    );
    return response.data;
  }
}

export const packerService = new PackerService();
