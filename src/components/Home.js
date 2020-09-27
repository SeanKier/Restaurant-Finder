import React, { useState, useEffect } from 'react';

import './Home.css';
import Restuarants from './Restuarants';
import Pagination from './Pagination';
import Selector from './Selector';

const Home = () => {
  const [restaurants, updateResturants] = useState([]);
  const [currentPage, changePage] = useState(1);
  const [currentRestaurants, updateCurrentRestaurants] = useState([]);
  const [genre, setGenre] = useState('All');
  const [currentState, setNewState] = useState('All');
  const [currentAttire, setAttire] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByNameDirection, changeSorttByNameDirection] = useState(true);
  const [sortByStateDirection, changeSortByStateDirection] = useState(true);

  const nextPage = () => {
    if (currentPage * 10 < currentRestaurants.length) {
      changePage(currentPage + 1);
    }
  }

  const previousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  }

  const fetchResturaunts = () => {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
      Authorization: 'Api-Key q3MNxtfep8Gt',
      },
     })
      .then((response) => response.json())
      .then((responses) => {
        responses.sort((responseA, responseB) => responseA.name.localeCompare(responseB.name));
        updateResturants(responses);
        updateCurrentRestaurants(responses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleStateChange = (event) => {
    setNewState(event.target.value);
  }

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleAttireChange = (event) => {
    setAttire(event.target.value);
  }

  const handleSortByName = () => {
    let sortedRestaurants;
    if (sortByNameDirection) {
      sortedRestaurants = currentRestaurants.sort((restaurantA, restaurantB) => restaurantB.name.localeCompare(restaurantA.name));
    } else  {
      sortedRestaurants = currentRestaurants.sort((restaurantA, restaurantB) => restaurantA.name.localeCompare(restaurantB.name));
    }
    updateCurrentRestaurants(sortedRestaurants);
    changeSorttByNameDirection(!sortByNameDirection);
  }

  const handleSortByState =  () => {
    let sortedRestaurants;
    if (sortByStateDirection) {
      sortedRestaurants = currentRestaurants.sort((restaurantA, restaurantB) => restaurantB.state.localeCompare(restaurantA.state));
    } else  {
      sortedRestaurants = currentRestaurants.sort((restaurantA, restaurantB) => restaurantA.state.localeCompare(restaurantB.state));
    }
    updateCurrentRestaurants(sortedRestaurants);
    changeSortByStateDirection(!sortByStateDirection);
  }

  const onSearchInputKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };

  const clearSearch = () => {
    if (searchTerm === '') {
      applyFilters();
    }
  }

  const applyFilters = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredRestaurants = restaurants.filter(restaurant => {
      return (
        ((currentState === 'All') || (restaurant.state === currentState)) &&
        ((genre === 'All') || (restaurant.genre.includes(genre))) &&
        ((currentAttire === 'All') || (restaurant.attire === currentAttire)) &&
        ((searchTerm.length === 0) || restaurant.name.toLowerCase().includes(lowerCaseSearchTerm) || restaurant.genre.toLowerCase().includes(lowerCaseSearchTerm) || restaurant.city.toLowerCase().includes(lowerCaseSearchTerm))
      )
    });
    updateCurrentRestaurants(filteredRestaurants);
    changePage(1);
  };

  const foodGenres = ['American', 'Seafood', 'International', 'Asian', 'Cafe'];
  const stateAbbreviations = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
   ];
   const attireOptions = ['casual', 'smart casual', 'business casual', 'formal'];

  useEffect(() => {
    applyFilters();
  }, [genre, currentState, currentAttire]);

  useEffect(() => {
    fetchResturaunts();
  }, []);

  useEffect(() => {
    clearSearch();
  }, [searchTerm]);

  return (
    <div>
      <div>
        <input
          className="search-input"
          type="text"
          name="search"
          size="65"
          placeholder="Search for restuarants"
          onChange={handleSearchInputChange}
          onKeyPress={onSearchInputKeyDownHandler}
        />
        <button
          className="search-button"
          onClick={applyFilters}
        >
          GO!
        </button>
      </div>
      <div className="selectors">
        <Selector title={'Pick your favorite type of food:'} currentValue={genre} handleChange={handleGenreChange} options={foodGenres} />
        <Selector title={'Pick your state:'} currentValue={currentState} handleChange={handleStateChange} options={stateAbbreviations} />
        <Selector title={'Pick your dress attire:'} currentValue={currentAttire} handleChange={handleAttireChange} options={attireOptions} />
      </div>
      <Restuarants restaurants={currentRestaurants.slice((currentPage - 1) * 10, currentPage * 10)} handleSortByName={handleSortByName} handleSortByState={handleSortByState} sortByNameDirection={sortByNameDirection} sortByStateDirection={sortByStateDirection} />
      { currentRestaurants.length === 0 && (
          <div className="no-results">
            There does not seem to be any results. Please adjust options to find more restaurants
          </div>
        )}
      <Pagination nextPage={nextPage} previousPage={previousPage} currentPage={currentPage} currentRestaurantsLength={currentRestaurants.length} />
   </div>
  );
};

export default Home;
