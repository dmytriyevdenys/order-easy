export interface ApiResponse<T> {
    success: boolean;
    status_code: number;
    data: T;
  }