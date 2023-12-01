import { useMemo, useState } from "react";
import s from "./Pagination.module.scss"

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
  const [currentPage, setCurrentPage]= useState<number>(current_page);

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
    [total_pages, current_page, siblingCount]
  );

  return (
    <div>
      <button
        disabled={current_page <= 1}
        onClick={() => onPageChange(current_page - 1)}
      >
        {"<"}
      </button>

      {pages.map((pageNumber: number | string, index) => (
        <span className={ (current_page === pageNumber) ? s.current : ''}
          key={index}
          style={{ cursor: "pointer", margin: "0 5px" }}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(Number(pageNumber))
          }
        >
          {pageNumber}
        </span>
      ))}

      <button
        disabled={current_page >= total_pages}
        onClick={() => onPageChange(current_page + 1)}
      >
        {">"}
      </button>
    </div>
  );
};
