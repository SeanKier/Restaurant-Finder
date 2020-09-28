import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames  from 'classnames';

import './Pagination.css';

const Pagination = ({ previousPage, nextPage, page, listLength, pageSize }) => {
  const previousButtonIsActive = page > 1;
  const nextButtonIsActive = page * pageSize < listLength && listLength !== 0;
  let totalNumberPages = Math.floor(listLength / pageSize);
  if (totalNumberPages !== listLength / pageSize) {
    totalNumberPages += 1;
  }

  return (
    <div className="pagination-container">
      <div className="button-container">
        <div
          className="pagination-button"
          onClick={previousPage}
        >
          <FontAwesomeIcon
            className={classNames("pagination-icon", { inactive: !previousButtonIsActive }, { active: previousButtonIsActive })}
            icon={faArrowAltCircleLeft}
          />
          <div>
            Previous Page
          </div>
        </div>
        { listLength !== 0 && (
          <div className="page-number">
            {`Page ${page} of ${totalNumberPages}`}
          </div>
        )}
        <div
          className="pagination-button"
          onClick={nextPage}
        >
          <FontAwesomeIcon
            className={classNames("pagination-icon", { inactive: !nextButtonIsActive }, { active: nextButtonIsActive })}
            icon={faArrowAltCircleRight}
          />
          <div>
            Next Page
          </div>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  listLength: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
