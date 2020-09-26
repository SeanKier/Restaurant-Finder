import React, { useState, useEffect } from 'react';

import './Home.css';
import Restuarants from './Restuarants';
import Pagination from './Pagination';

const Home = () => {
  const [restaurants, updateResturants] = useState([]);
  const [currentPage, changePage] = useState(1);
  const [currentRestaurants, updateCurrentRestaurants] = useState([]);
  const [genre, setGenre] = useState('All');
  const [currentState, setNewState] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const nextPage = () => {
    if (currentPage * 10 < restaurants.length) {
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
    let filteredByGenre = restaurants;
    if (genre !== 'All') {
      filteredByGenre = filteredByGenre.filter((restaurant) => {
        return restaurant.genre.includes(genre);
      })
    }
    let filteredByState = filteredByGenre;
    if (currentState !== 'All') {
      filteredByState = filteredByState.filter((restaurant) => {
        return restaurant.state === currentState;
      })
    }
    let filteredBySearch = filteredByState;
    if (searchTerm !== '') {
      filteredBySearch = filteredBySearch.filter((restaurant) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return restaurant.name.toLowerCase().includes(lowerCaseSearchTerm) || restaurant.state.toLowerCase() === lowerCaseSearchTerm || restaurant.genre.toLowerCase().includes(lowerCaseSearchTerm) || restaurant.city.toLowerCase().includes(lowerCaseSearchTerm);
      })
    }
    updateCurrentRestaurants(filteredBySearch);
  }

  const foodGenres = ['American', 'Seafood', 'International', 'Asian', 'Cafe'];
  const stateAbbreviations = [
    'AL','AK','AS','AZ','AR','CA','CO','CT','DE','DC','FM','FL','GA',
    'GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MH','MD','MA',
    'MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND',
    'MP','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT',
    'VT','VI','VA','WA','WV','WI','WY'
   ];

  useEffect(() => {
    applyFilters();
  }, [genre, currentState]);

  useEffect(() => {
    fetchResturaunts();
  }, []);

  useEffect(() => {
    clearSearch();
  }, [searchTerm]);

  return (
    <div>
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
      <label className="selector">
        Pick your favorite type of food:
        <select value={genre} onChange={handleGenreChange}>
          <option value="All">All</option>
          {foodGenres.map((genre, i) =>
            <option value={genre} key={i}>{genre}</option>
          )}
        </select>
      </label>
      </div>
      <div>
      <label className="selector">
        Pick your state
        <select value={currentState} onChange={handleStateChange}>
          <option value="All">All</option>
          {stateAbbreviations.map((genre, i) =>
            <option value={genre} key={i}>{genre}</option>
          )}
        </select>
      </label>
      </div>
      <Restuarants restaurants={currentRestaurants.slice((currentPage - 1) * 10, currentPage * 10)} />
      { currentRestaurants.length === 0 && (
          <div className="no-results">
            There does not seem to be any results. Please adjust options to find more restaurants
          </div>
        )}
      <Pagination nextPage={nextPage} previousPage={previousPage} />
   </div>
  );
};

export default Home;
