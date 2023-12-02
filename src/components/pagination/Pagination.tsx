import { useMemo } from "react";
import s from "./Pagination.module.scss"
import { PaginationItem } from "./PaginationItem/PaginationItem";

type PaginationProps = {
  current_page: number;
  total_pages: number;
  next_page: string;
  previous_page: string;
  elems?: number;
  onPageChange: (n: number) => void;
  onNextPage?: (url: string) => void;
  siblingCount?: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  current_page = 1,
  total_pages = 1,
  next_page,
  previous_page,
  onPageChange,
  elems = 5,
  siblingCount = 1,
}) => {

  const range = (
    from: number,
    to: number,
    step = 1
  ): Array<string | number> => {
    let i = from;
    const range: Array<string | number> = [];

    if (from > 2) {
      range.push("...");
    }

    while (i <= to) {
      range.push(i);
      i += step;
    }

    if (to < total_pages - 1) {
      range.push("...");
    }

    return range;
  };

  const fetchPageNumbers = () => {
    const currentPage = current_page;
  
    let startPage = Math.max(2, currentPage - siblingCount);
    let endPage = Math.min(total_pages - 1, currentPage + siblingCount);
    
    if (currentPage < elems - 1) {
      startPage = 2;
      endPage = elems
      
    } else if (currentPage <= elems) {
      startPage = Math.max(2, currentPage - siblingCount);
      endPage = Math.min(total_pages - 1, currentPage + siblingCount);
    }
 
    let pages = range(startPage, endPage);
    return [1, ...pages, total_pages];
  };

  const pages = useMemo(
    () => fetchPageNumbers(),
    [fetchPageNumbers]
  );

  return (
    <div className={s.container}>
      <PaginationItem typeIcon='left'
        disabled={current_page <= 1}
        onClick={() => onPageChange(current_page - 1)}
      />
        <div >
        {pages.map((pageNumber: number | string, index) => (
        <PaginationItem
        pageNumber={pageNumber}
          key={index}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(Number(pageNumber))
          }
        >
          {pageNumber}
        </PaginationItem>
      ))}
        </div>
<PaginationItem typeIcon='rigth'
        disabled={current_page <= 1}
        onClick={() => onPageChange(current_page + 1)}
      />
    </div>
  );
};
