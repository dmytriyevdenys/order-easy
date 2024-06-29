export interface ApiResponse<T> {
  success: boolean;
  status_code: number
  data: T;
  } 

  export type ApiResponsePagination<T> = ApiResponse<T> & {
    current_page: number,
    per_page: number,
    total_pages: number,
    total: number,
    first_page: string,
    next_page: string,
    last_page: string
    previous_page: string
  } 