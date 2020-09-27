import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames  from 'classnames';

import './Pagination.css';

const Pagination = ({ previousPage, nextPage, currentPage, currentRestaurantsLength }) => {
  const previousButtonIsActive = currentPage > 1;
  const nextButtonIsActive = currentPage * 10 < currentRestaurantsLength;

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
  pageNumber: PropTypes.number.isRequired,
  currentRestaurantsLength: PropTypes.number.isRequired,
};

export default Pagination;
