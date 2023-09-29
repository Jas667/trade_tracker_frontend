import React from "react";
import Pagination from "react-bootstrap/Pagination";

const TradePagination = ({ currentPage, setCurrentPage, totalPages, startPage, pageNumbers, endPage }) => {

  return (
    <div className="mt-4">
      <Pagination>
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        />

        {startPage > 1 && (
          <>
            <Pagination.Item onClick={() => setCurrentPage(1)}>
              1
            </Pagination.Item>
            {startPage > 2 && <Pagination.Ellipsis />}
          </>
        )}

        {pageNumbers.map((num) => (
          <Pagination.Item
            key={num}
            active={num === currentPage}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </Pagination.Item>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <Pagination.Ellipsis />}
            <Pagination.Item onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </Pagination.Item>
          </>
        )}

        <Pagination.Next
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default TradePagination;
