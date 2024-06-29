
export type TPagination =  {
    current_page: number,
    per_page?: number,
    total_pages: number,
    total?: number,
    first_page?: string,
    next_page?: string,
    last_page?: string
    previous_page?: string
}

export type TPaginationProps = TPagination & {
    elems?: number;
    onPageChange: (n: number) => void;
    onNextPage?: (url: string) => void;
    onPreviusPage?:(url: string) => void;
    onPerPageChange:(perPage: number) => void;
    siblingCount?: number;
  };