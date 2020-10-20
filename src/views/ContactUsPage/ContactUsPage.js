import React, { useContext, useEffect, useState } from "react"
import {firebaseConfig} from "../../App";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ContactUsPage = ({center, zoom})=>{

    return <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:firebaseConfig.apiKey }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>

    </div>

};

ContactUsPage.defaultProps = {
        center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
};

export default ContactUsPage;