import React, {useContext, useEffect, useState} from "react"
import {FaAnchor} from "react-icons/fa";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import {firebaseConfig} from "../../App";

const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
  StreetViewPan,
    OverlayView,

} = require("react-google-maps");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const M = ()=>{
  return <MarkerWithLabel
      text={"Whaddd"}
      labelStyle={{backgroundColor: "yellow", fontSize: "32px", padding: "16px"}}
    >
      <div>Hello There!</div>
    </MarkerWithLabel>
};

//https://stackoverflow.com/questions/41405343/adding-marker-to-google-maps-in-google-map-react
export const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <div>
    <div style={{backgroundColor:"blue",position:"fixed", top:100, left:0, color:'white', height: '90px'}}>
      jfdngkfmrwnfnrjfrf

    </div>
    <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 37.806279, lng: -122.423516 }}
  >
    <Marker3
        lat={37.806279} lng={-122.423516 }

        markerWithLabel={"Hey This is my lable"}
      position={{ lat: 37.806279, lng: -122.423516 }}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <FaAnchor />
      </InfoWindow>}
    </Marker3>
  </GoogleMap>
    </div>
);


const Marker3 = props => {
  return <div className="SuperAwesomePin" style={{color:'white',backgroundColor:'blue'}}>
    Sexy AF Whats up
  </div>
}


const mapContainerStyle = {
  height: "400px",
  width: "800px"
}

const center = {
  lat: 37.806279,
  lng: -122.42351
}

const position = {
  lat: 37.772,
  lng:-122.42351
}

const onLoad = marker => {
  console.log('marker: ', marker)
}

const Map = () =>{
    const [map, setMap] = React.useState(null)

  return (
      <LoadScript
        googleMapsApiKey={firebaseConfig.apiKey}
      >
        <GoogleMap
    id="marker-example"
    mapContainerStyle={mapContainerStyle}
    zoom={18}
    center={center}
  >

    <Marker
      onLoad={onLoad}
      position={position}
    />
  </GoogleMap>
      </LoadScript>

  )
};


export default Map