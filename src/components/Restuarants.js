import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import './Restuarants.css';
import MoreInfo from './MoreInfo';

const RestaurantItem = ({ restaurant, isVisible, setRestaurant }) => {

  const handleShowMoreInfoClick = () => {
    setRestaurant(restaurant);
    isVisible(true);
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

RestaurantItem.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    genre:PropTypes.string.isRequired,
  }).isRequired,
  isVisible: PropTypes.func.isRequired,
  setRestaurant: PropTypes.func.isRequired
};

const Restuarants = ({ restaurants, handleSortByName, handleSortByState, sortByNameDirection, sortByStateDirection }) => {
  const [restaurant, setRestaurant] = useState({});
  const [visible, isVisible] = useState(false);

  return (
    <div className="restuarant-container">
      <table>
        <thead>
        <tr>
          <th
            className="table-head-sortable"
            onClick={handleSortByName}
            >
            <div className="table-sortable-container">
              { sortByNameDirection && (
                <FontAwesomeIcon
                  className="sorting-arrow"
                  icon={faArrowUp}
                />
              )}
              { !sortByNameDirection && (
                <FontAwesomeIcon
                  className="sorting-arrow"
                  icon={faArrowDown}
                />
              )}
              <div>
                Name
              </div>
            </div>
          </th>
          <th>City</th>
          <th
            className="table-head-sortable"
            onClick={handleSortByState}
            >
            <div className="table-sortable-container">
              { sortByStateDirection && (
                <FontAwesomeIcon
                  className="sorting-arrow"
                  icon={faArrowUp}
                />
              )}
              { !sortByStateDirection && (
                <FontAwesomeIcon
                  className="sorting-arrow"
                  icon={faArrowDown}
                />
              )}
              <div>
                State
              </div>
            </div>
          </th>
          <th>Phone</th>
          <th>Type of Food</th>
        </tr>
        </thead>
        <tbody>
        {restaurants.map((restaurant, i) => <RestaurantItem restaurant={restaurant} isVisible={isVisible} setRestaurant={setRestaurant} key={i}/>)}
        </tbody>
      </table>
      { visible && (
        <MoreInfo restaurant={restaurant} isVisible={isVisible} />
      )}
    </div>
  )
};


Restuarants.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSortByName: PropTypes.func.isRequired,
  handleSortByState: PropTypes.func.isRequired,
  sortByNameDirection: PropTypes.bool.isRequired,
  sortByStateDirection:PropTypes.bool.isRequired,
};

export default Restuarants;
