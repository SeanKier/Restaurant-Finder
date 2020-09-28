import React, { useState, useEffect } from 'react';

import './Home.css';
import Restuarants from './Restuarants';
import Pagination from './Pagination';
import Selector from './Selector';

const Home = () => {
  const [restaurants, setResturants] = useState([]);
  const [page, setPage] = useState(1);
  const [currentRestaurants, setCurrentRestaurants] = useState([]);
  const [genre, setGenre] = useState('All');
  const [addressState, setAddressState] = useState('All');
  const [attire, setAttire] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByNameDirection, setSortByNameDirection] = useState(true);
  const [sortByStateDirection, setSortByStateDirection] = useState(true);
  const [lastSortedBy, setLastSortedBy] = useState('none');

  const pageSize = 10;

  const nextPage = () => {
    if (page * pageSize < currentRestaurants.length) {
      setPage(page + 1);
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
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
        setResturants(responses);
        setCurrentRestaurants(responses);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleStateChange = (event) => {
    setAddressState(event.target.value);
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
    setCurrentRestaurants(sortedRestaurants);
    setSortByNameDirection(!sortByNameDirection);
    setLastSortedBy('name');
  }

  const handleSortByState =  () => {
    let sortedRestaurants;
    if (sortByStateDirection) {
      sortedRestaurants = currentRestaurants.sort((restaurantA, restaurantB) => restaurantB.state.localeCompare(restaurantA.state));
    } else  {
      sortedRestaurants = currentRestaurants.sort((restaurantA, restaurantB) => restaurantA.state.localeCompare(restaurantB.state));
    }
    setCurrentRestaurants(sortedRestaurants);
    setSortByStateDirection(!sortByStateDirection);
    setLastSortedBy('state');
  }

  const handleSearchInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };

  const clearSearchResultsIfNeeded = () => {
    if (searchTerm === '') {
      applyFilters();
    }
  }

  const applyFilters = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let filteredRestaurants = restaurants.filter(restaurant => {
      return (
        ((addressState === 'All') || (restaurant.state === addressState)) &&
        ((genre === 'All') || (restaurant.genre.includes(genre))) &&
        ((attire === 'All') || (restaurant.attire === attire)) &&
        ((searchTerm.length === 0) || restaurant.name.toLowerCase().includes(lowerCaseSearchTerm)
          || restaurant.genre.toLowerCase().includes(lowerCaseSearchTerm)
          || restaurant.city.toLowerCase().includes(lowerCaseSearchTerm))
      )
    });
    if (lastSortedBy === 'name' && !sortByNameDirection) {
      filteredRestaurants = filteredRestaurants.sort((restaurantA, restaurantB) => restaurantB.name.localeCompare(restaurantA.name));
    } else if (lastSortedBy === 'state' && !sortByStateDirection) {
      filteredRestaurants = filteredRestaurants.sort((restaurantA, restaurantB) => restaurantB.state.localeCompare(restaurantA.state));
    } else if (lastSortedBy === 'state' && sortByStateDirection) {
      filteredRestaurants = filteredRestaurants.sort((restaurantA, restaurantB) => restaurantA.state.localeCompare(restaurantB.state));
    }
    setCurrentRestaurants(filteredRestaurants);
    setPage(1);
  };

  const foodGenres = [
    'American', 'Seafood', 'International', 'Asian', 'Cafe', 'Steak', 'Traditional',
    'European', 'French', 'Belgian', 'Vegetarian', 'Contemporary', 'Oysters', 'Italian',
    'Bakery', 'Grill', 'Japanese', 'Sushi', 'Continental', 'Hawaiian', 'Polynesian',
    'Pacific Rim', 'Cafe', 'Vietnamese', 'Bistro', 'Irish', 'British', 'Eclectic', 'Kosher',
    'Pasta', 'Sandwiches', 'Fusion'
  ];
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
  }, [genre, addressState, attire]);

  useEffect(() => {
    fetchResturaunts();
  }, []);

  useEffect(() => {
    clearSearchResultsIfNeeded();
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
          onKeyPress={handleSearchInputKeyDown}
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
        <Selector title={'Pick your state:'} currentValue={addressState} handleChange={handleStateChange} options={stateAbbreviations} />
        <Selector title={'Pick your dress attire:'} currentValue={attire} handleChange={handleAttireChange} options={attireOptions} />
      </div>
      <Restuarants restaurants={currentRestaurants.slice((page - 1) * pageSize, page * pageSize)} handleSortByName={handleSortByName} handleSortByState={handleSortByState} sortByNameDirection={sortByNameDirection} sortByStateDirection={sortByStateDirection} />
      { currentRestaurants.length === 0 && (
          <div className="no-results">
            There does not seem to be any results. Please adjust options to find more restaurants
          </div>
        )}
      <Pagination nextPage={nextPage} previousPage={previousPage} page={page} listLength={currentRestaurants.length} pageSize={pageSize} />
   </div>
  );
};

export default Home;
