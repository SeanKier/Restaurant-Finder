import React from 'react';

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

export default Selector;
