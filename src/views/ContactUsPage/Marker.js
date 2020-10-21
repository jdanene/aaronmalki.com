import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {firebaseConfig} from "../../App";
import GoogleMapReact from 'google-map-react';

const position = {
  lat: 37.772,
  lng:-122.42351
};

const Map = props => {
  return (
      <div style={{height: '600px', width:'600px'}}>
    <GoogleMapReact
     bootstrapURLKeys={firebaseConfig.apiKey }
     defaultCenter={{lat: position.lat, lng: position.lng}}
     defaultZoom={18}>

       {/* This is the missing part in docs:
         *
         * Basically, you only need to add a Child Component that
         * takes 'lat' and 'lng' Props. And that Component should
         * returns a text, image, super-awesome-pin (aka, your marker).
         *
         */}
    </GoogleMapReact>
        </div>
  )
}

const Marker3 = props => {
  return <div className="SuperAwesomePin"></div>
}

export default Map