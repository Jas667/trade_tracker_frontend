import React from "react";
import Pagination from "react-bootstrap/Pagination";

const TradePagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(
    1,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
  startPage = Math.max(1, endPage - maxPageNumbersToShow + 1); // Recalculate start to adjust for end

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="mt-3 mb-3">
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
