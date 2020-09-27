import React, { useState } from 'react';

import './Restuarants.css';
import MoreInfo from './MoreInfo';

const RestaurantItem = ({ restaurant, isExpanded, setCurrentRestaurant }) => {

  const handleShowMoreInfoClick = () => {
    setCurrentRestaurant(restaurant);
    isExpanded(true);
  };

  const { name, city, state, telephone, genre } = restaurant;
  return (
    <tr
      onClick={handleShowMoreInfoClick}
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
  const [currentRestaurant, setCurrentRestaurant] = useState({});
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
        {restaurants.map((restaurant, i) => <RestaurantItem restaurant={restaurant} isExpanded={isExpanded} setCurrentRestaurant={setCurrentRestaurant} key={i}/>)}
        </tbody>
      </table>
      { expanded && (
        <MoreInfo currentRestaurant={currentRestaurant} isExpanded={isExpanded} />
      )}
    </div>
  )
};


export default Restuarants;
