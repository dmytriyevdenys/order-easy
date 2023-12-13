import { useState } from "react";
import { ApiResponsePagination } from "../interfaces/api-response.interface";
import { TPaginationProps } from "../interfaces/pagination.type";
import { UseQueryResult } from "@tanstack/react-query";

type fetchData<T> =  (options: {limit: number, page: number},packerId: number, pageUrl?: string) => UseQueryResult<T>;


export const usePagination = <T>(data: ApiResponsePagination<T> | undefined, fetchData: fetchData<T>): TPaginationProps => {
    const { current_page = 1, total_pages = 1, next_page = '', previous_page = '', per_page = 10 } = data ?? {};
    const [currenetPage, setCurrentPage] = useState(current_page);
    const [perPage, setPerPage] = useState(per_page);
    const [urlPage, setUrlPage] = useState({ nextPage: next_page, previousPage: previous_page });
    
    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    const onPerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
    }

    const onNextPage = (nextPage: string) => {
        setUrlPage((prev) => ({
            ...prev,
            nextPage: nextPage
        }))
    }

    const onPreviusPage = (previusPage: string) => {
        setUrlPage((prev) => ({
            ...prev,
            previousPage: previusPage
        }))
    }

    
    return {
        current_page: currenetPage,
        per_page: perPage,
        total_pages,
        onPageChange,
        onPerPageChange,
        onNextPage,
        onPreviusPage,
        next_page: urlPage.nextPage,
        previous_page: urlPage.previousPage
    }
}
