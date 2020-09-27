import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

import './Pagination.css';

const Pagination = ({ previousPage, nextPage }) => (
  <div className="pagination-container">
    <div className="button-container">
      <div
        className="pagination-button"
        onClick={previousPage}
      >
        <FontAwesomeIcon
          className="pagination-icon"
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
          className="pagination-icon"
          icon={faArrowAltCircleRight}
        />
        <div>
          Next Page
        </div>
      </div>
    </div>
  </div>
);

Pagination.propTypes = {
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
};

export default Pagination;
