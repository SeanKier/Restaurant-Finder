import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

import './Table.css';
import Restuarants from './Restuarants';

const Table = () => {
  const [restaurants, updateResturants] = useState([]);
  const [currentPage, changePage] = useState(1);
  const [currentRests, updateCurrentRest] = useState([]);
  const [genre, setGenre] = useState('All');
  const [currentState, setNewState] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const nextPage = () => {
    changePage(currentPage + 1);
  }

  const prevPage = () => {
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
      .then((response) => {
        response.sort((a, b) => a.name.localeCompare(b.name));
        updateResturants(response);
        updateCurrentRest(response);
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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const onKeyDownHandler = (event) => {
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
    let filteredByGenre = [];
    if (genre !== 'All') {
      filteredByGenre = restaurants.filter((rest) => {
        return rest.genre.includes(genre);
      })
    } else {
      filteredByGenre = restaurants;
    }
    let filteredByState = [];
    if (currentState !== 'All') {
      filteredByState = filteredByGenre.filter((rest) => {
        return rest.state === currentState;
      })
    } else {
      filteredByState = filteredByGenre;
    }
    let filteredBySearch = [];
    if (searchTerm !== '') {
      filteredBySearch = filteredByState.filter((rest) => {
        return rest.name.includes(searchTerm) || rest.state === searchTerm || rest.genre.includes(searchTerm);
      })
    } else {
      filteredBySearch = filteredByState;
    }
    updateCurrentRest(filteredBySearch);
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
        onChange={handleInputChange}
        onKeyPress={onKeyDownHandler}
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
      <Restuarants restaurants={currentRests.slice((currentPage - 1) * 10, currentPage * 10)} />
      <div className="outer">
        <div className="button-container">
          <div
            className="nav-button"
            onClick={prevPage}
          >
            <FontAwesomeIcon
              className="nav-icon"
              icon={faArrowAltCircleLeft}
            />
            <div>
              Previous Page
            </div>
          </div>
          <div
            className="nav-button"
            onClick={nextPage}
          >
            <FontAwesomeIcon
              className="nav-icon"
              icon={faArrowAltCircleRight}
            />
            <div>
              Next Page
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
