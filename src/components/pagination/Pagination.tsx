import { useMemo } from "react";
import s from "./Pagination.module.scss"
import { PaginationItem } from "./PaginationItem/PaginationItem";
import { TPaginationProps } from "../../interfaces/pagination.type";
import { DropDownPerPage } from "./DropDownPerPage/DropDownPerPage";


export const Pagination: React.FC<TPaginationProps> = ({
  current_page = 1,
  total_pages = 1,
  next_page,
  previous_page,
  per_page = 20 ,
  elems = 5,
  siblingCount = 1,
  onPageChange,
  onNextPage,
  onPreviusPage,
  onPerPageChange
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
    
    if (currentPage < elems - 1 && total_pages >= elems) {
      startPage = 2;
      endPage = elems
      
    } else if (currentPage <= elems) {
      startPage = Math.max(2, currentPage - siblingCount);
      endPage = Math.min(total_pages - 1, currentPage + siblingCount);
    }
      if (total_pages === 1) {
        return [total_pages];
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
    <div className={s.container_pagination}>
      <PaginationItem typeIcon='left'
        disabled={current_page <= 1}
        onClick={() => onPageChange(current_page - 1)}
      />
        <div className={s.itmes_container} >
        {pages.map((pageNumber: number | string, index) => (
        <PaginationItem
        pageNumber={pageNumber}
        current_page={current_page}
          key={index}
          onClick={() =>
            typeof pageNumber === "number" && onPageChange(Number(pageNumber))
          }
        >
          {pageNumber}
        </PaginationItem>
      ))}
        </div>
<PaginationItem typeIcon='right'
        disabled={current_page === total_pages}
        onClick={() => onPageChange(current_page + 1)}
      />
    </div >
    <div className={s.drop_down_container}>
    <label className={s.label_per_page}>на сторінці</label> 
    <DropDownPerPage per_page={Number(per_page)} onPerPageChange={onPerPageChange}/>
    </div>
   </div>

  );
};
