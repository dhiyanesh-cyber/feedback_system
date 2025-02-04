import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, processedStudents }) => {
    const totalPages = Math.ceil(processedStudents.length / itemsPerPage);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="mt-4 flex justify-center items-center gap-2">
            {/* Previous page arrow */}
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                &lt;&lt;
            </button>

            {/* Page numbers */}
            {Array.from({ length: totalPages })
                .map((_, index) => {
                    const pageNumber = index + 1;
                    // Show current page and 1 page before and after
                    if (
                        pageNumber === currentPage ||
                        pageNumber === currentPage - 1 ||
                        pageNumber === currentPage + 1 ||
                        pageNumber === 1 ||
                        pageNumber === totalPages
                    ) {
                        return (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(pageNumber)}
                                className={`px-3 py-1 rounded ${currentPage === pageNumber
                                    ? "bg-black text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {pageNumber}
                            </button>
                        );
                    } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                    ) {
                        return (
                            <span key={index} className="px-2">
                                ...
                            </span>
                        );
                    }
                    return null;
                })
                .filter(Boolean)}

            {/* Next page arrow */}
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}
            >
                &gt;&gt;
            </button>
        </div>
    );
};

export default Pagination;
