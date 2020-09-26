import React, { useState } from 'react';

import './Restuarants.css';
import './MoreInfo.css';
import MoreInfo from './MoreInfo';

const RestuarantItem = ({ rest, isExpanded, setCurrentRest }) => {

  const handleClick = () => {
    setCurrentRest(rest);
    isExpanded(true);
  };

  const { name, city, state, telephone, genre } = rest;
  return (
    <tr
      onClick={handleClick}
    >
      <td className="name">
        {name}
      </td>
      <td className="city">
        {city}
      </td>
      <td className="state">
        {state}
      </td>
      <td className="telephone">
        {telephone}
      </td>
      <td className="genre">
        {genre}
      </td>

    </tr>
  );
};


const Restuarants = ({ restaurants }) => {
  const [currentRest, setCurrentRest] = useState({});
  const [expanded, isExpanded] = useState(false);

  return (
    <div className="restuarant-container">
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Phone Number</th>
          <th>Type of Food</th>
        </tr>
        </thead>
        <tbody>
        {restaurants.map((rest, i) => <RestuarantItem rest={rest} isExpanded={isExpanded} setCurrentRest={setCurrentRest} key={i}/>)}
        </tbody>
      </table>
      { expanded && (
        <MoreInfo currentRest={currentRest} isExpanded={isExpanded} />
      )}
    </div>
  )
};


export default Restuarants;
