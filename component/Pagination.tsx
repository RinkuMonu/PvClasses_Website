"use client";
import React, { JSX } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
};

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? "active" : ""}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="styled-pagination d-flex justify-content-center pb-5">
      <ul className="clearfix">
        <li className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage - 1);
            }}
          >
            <FaAngleLeft />
          </a>
        </li>

        {renderPageNumbers()}

        <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(currentPage + 1);
            }}
          >
            <FaAngleRight />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
