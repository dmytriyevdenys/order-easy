import { IPacker } from "../interfaces/packer.interface";
import {
  ApiResponse,
  ApiResponsePagination,
} from "../interfaces/api-response.interface";
import { IntDoc } from "../interfaces/int-doc.type";
import { TScanIntDoc } from "../interfaces/packer/scan-int-doc.type";
import { api } from "./api/axiosConfig";

class PackerService {
  private packerPath = 'packer';
  private internetDocumentPath = 'internet-document';

  async getAllPackers() {
    const packers = await api.get<ApiResponse<IPacker[]>>(this.packerPath);
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
          ? `${this.internetDocumentPath}?packerId=${packerId}`
          : this.internetDocumentPath);

    const response = await api.get<ApiResponsePagination<IntDoc[]>>(url, {
      params: options,
    });

    return response.data;
  }

  async checkPacker(
    id: number,
    password: { password: string }
  ): Promise<IPacker> {
    const response = await api.post<ApiResponse<IPacker>>(
      `${this.packerPath}/${id}`,
      password
    );
    return response.data.data;
  }

  async addPacker ({name, password}: {name: string, password: string}) {
     const response = await api.post<ApiResponse<IPacker>>(this.packerPath, {name, password});
     return response.data;
  }

  async scanIntDoc(
    id: number,
    intDoc: TScanIntDoc
  ): Promise<ApiResponsePagination<IntDoc>> {
    
    const response = await api.post<ApiResponsePagination<IntDoc>>(
      `${this.packerPath}/${id}/scan/`,
      intDoc
    );
    return response.data;
  }
}

export const packerService = new PackerService();
