import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination = ({
  totalRecords = null,
  pageLimit = 30,
  pageNeighbours = 0,
  onPageChanged = f => f,
}) => {
  pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
  totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

  pageNeighbours =
    typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 0;

  const totalPages = Math.ceil(totalRecords / pageLimit);

  const [state, setState] = useState({
    currentPage: 1,
  });

  const gotoPage = page => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      totalPages,
      pageLimit,
      totalRecords,
    };

    setState({currentPage});
    onPageChanged(paginationData);
  };

  useEffect(() => {
    gotoPage(1);
    // eslint-disable-next-line
  }, [totalPages]);

  const handleClick = (page, evt) => {
    evt.preventDefault();
    gotoPage(page);
  };

  const handleMoveLeft = evt => {
    evt.preventDefault();
    gotoPage(state.currentPage - pageNeighbours * 2);
  };

  const handleMoveRight = evt => {
    evt.preventDefault();
    gotoPage(state.currentPage + pageNeighbours * 2);
  };

  const fetchPageNumbers = () => {
    const totalNumbers = pageNeighbours * 2 + 2;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  if (!totalRecords) return null;

  if (totalPages === 1) return null;

  const {currentPage} = state;
  const pages = fetchPageNumbers();

  return (
    <nav aria-label="Countries Pagination">
      <ul className="pagination mt-4">
        {pages.map((page, index) => {
          if (page === LEFT_PAGE)
            return (
              <li key={index} className="page-item">
                <ul
                  className="page-link"
                  aria-label="Previous"
                  onClick={handleMoveLeft}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </ul>
              </li>
            );

          if (page === RIGHT_PAGE)
            return (
              <li key={index} className="page-item">
                <ul
                  className="page-link"
                  aria-label="Next"
                  onClick={handleMoveRight}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </ul>
              </li>
            );

          return (
            <li
              key={index}
              className={`page-item${currentPage === page ? ' active' : ''}`}
            >
              <ul className="page-link" onClick={e => handleClick(page, e)}>
                {page}
              </ul>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default Pagination;
