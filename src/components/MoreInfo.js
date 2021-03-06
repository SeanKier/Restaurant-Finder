import React from 'react';
import PropTypes from 'prop-types';

import './MoreInfo.css';

const MoreInfo = ({ restaurant, isVisible }) => {

  const handleCloseMoreInfoClick = () => {
    isVisible(false);
  }

  const { name, city, state, telephone, website, address1, zip, lat, long, hours } = restaurant;

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
              {hours.split(';').map((day, i) => <div key={i}>{day}</div>)}
            </div>
          </div>
        </div>
        <button
          className="close-button"
          onClick={handleCloseMoreInfoClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

MoreInfo.propTypes = {
  restaurant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    address1: PropTypes.string.isRequired,
    zip:PropTypes.string.isRequired,
    lat:PropTypes.string.isRequired,
    long:PropTypes.string.isRequired,
    hours:PropTypes.string.isRequired,
  }).isRequired,
  isVisible: PropTypes.func.isRequired,
};

export default MoreInfo;
