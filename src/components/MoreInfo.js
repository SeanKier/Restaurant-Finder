import React from 'react';

import './MoreInfo.css';

const MoreInfo = ({ currentRest, isExpanded }) => {

  const handleClick = () => {
    isExpanded(false);
  }

  const { name, city, state, telephone, website, address1, zip, lat, long, hours } = currentRest;

  return (
    <div className="more-info-container">
      <div className="more-info">
        <h3>
          {name}
        </h3>
        <div>
        <iframe
          title="map"
          width="430"
          height="250"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBOvRhJ6RpM3P_KaitjCRwxWppJ8Mw6bnU
            &q=${lat}, ${long}`} allowFullScreen>
        </iframe>
        </div>
        <a
          className="res-url"
          style={{ display: 'table-cell' }}
          href={website}
          target="_blank"
          rel="noreferrer"
        >
          <div className="website-container">
            <div className="webiste-link info-title">
              {website}
            </div>
          </div>
        </a>
        <div className="res-contact-container">
          <div className="address contact-type">
            <div className="info info-title">
              Address:
            </div>
            <div className="info">
              <div>
                {address1}
              </div>
              <div>
                {`${city}, ${state}`}
              </div>
              <div>
                {zip}
              </div>
            </div>
          </div>
          <div className="phone contact-type">
            <div className="info info-title">
              Phone:
            </div>
            <div className="info">
              {telephone}
            </div>
          </div>
          <div className="hours contact-type">
            <div className="info info-title">
              Hours:
            </div>
            <div className="info">
              {hours.split(';').map((day) => <div>{day}</div>)}
            </div>
          </div>
        </div>
        <button
          className="search-button"
          onClick={handleClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MoreInfo;
