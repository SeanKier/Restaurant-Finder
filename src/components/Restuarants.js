import React from 'react';

import './Restuarants.css';

const RestuarantItem = ({ rest }) => {

  const { name, city, state, telephone, genre } = rest;
  return (
    <tr>
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

  return (
    <div>
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
          {restaurants.map((rest, i) => <RestuarantItem rest={rest} key={i}/>)}
          </tbody>
        </table>
    </div>
  )
};

export default Restuarants;
