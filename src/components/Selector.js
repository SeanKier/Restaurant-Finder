import React from 'react';
import PropTypes from 'prop-types';

import './Selector.css';

const Selector = ({ currentValue, handleChange, options, title }) => (
  <div className="selector">
    <label>
      {title}
      <select value={currentValue} onChange={handleChange}>
        <option value="All">All</option>
        {options.map((genre, i) =>
          <option value={genre} key={i}>{genre}</option>
        )}
      </select>
    </label>
  </div>
);

Selector.propTypes = {
  currentValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Selector;
