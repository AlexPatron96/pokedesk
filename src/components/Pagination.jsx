import React, { useState } from 'react';

const Pagination = ({ paginationAttributes, onPrevClick, onNextClick, onPageChange }) => {

    const currentPage = paginationAttributes.currentPage
    const maxPageLimit = paginationAttributes.maxPageLimit
    const minPageLimit = paginationAttributes.minPageLimit
    const totalPages = paginationAttributes.totalPages;
    const pages = [];
    //console.log(paginationAttributes)
    //console.log(paginationAttributes.response);
    //console.log(maxPageLimit);
    //console.log(minPageLimit);


    const handlePrevClick = () => {
        onPrevClick();
    }
    const handleNextClick = () => {
        onNextClick();
    }
    const handlePageClick = (e) => {
        onPageChange(Number(e.target.id));
    }


    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const pageNumbers = pages.map(page => {
        if (page <= maxPageLimit && page > minPageLimit) {
            return (
                <li key={page} id={page} onClick={handlePageClick}
                    className={currentPage === page ? 'active' : null}>
                    {page}
                </li>
            )
        } else {
            return null;
        }
    }
    )

    let pageIncrementEllipses = null;
    if (pages.length > maxPageLimit) {
        pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>
    }
    let pageDecremenEllipses = null;
    if (minPageLimit >= 1) {
        pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>
    }


    return (
        <ul className="pageNumbers">
            <li>
                <button className='buttPg bx bxs-left-arrow' onClick={handlePrevClick} disabled={currentPage === pages[0]}>
                </button>
            </li>
            {pageDecremenEllipses}
            {pageNumbers}
            {pageIncrementEllipses}
            <li>
                <button className='buttPg bx bxs-right-arrow' onClick={handleNextClick} disabled={currentPage === pages[pages.length - 1]}></button>
            </li>
        </ul>
    );
};

export default Pagination;