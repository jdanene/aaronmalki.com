import React, {useCallback, useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import {GoogleMap, OverlayView, Marker, LoadScript, InfoBox, Data, InfoWindow} from '@react-google-maps/api'
import {firebaseConfig} from "../../../App";
import {StyledText} from "../../../components/Text";
import {colorScheme} from "../../../constants";
import {AppContext} from "../../../context";
import NavigateToGoogleMapButton from "./NavigateToGoogleMapButton";

const centerOverlayView = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
});

const mapContainerStyle = {
    height: "100%",
    width: "100%",
};

const exampleMapStyles = [
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#eeeeee",
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
            {
                color: "#9e9e9e",
            },
        ],
    },
];

//https://developers.google.com/maps/documentation/javascript/reference?csw=1#MapOptions
const defaultMapOptions = {
  fullscreenControl: false,
};

const ShowGoogleMap = ({styles}) => {
    const {address,phoneNumber,email} = useContext(AppContext);

    const [overlayPane, setOverlayPane] = React.useState(
        OverlayView.FLOAT_PANE
    );

    const clickHandler = React.useCallback(() => {
        alert('You clicked overlay view')
    }, []);

    const loadCallback = React.useCallback((e) => {
        console.log('OverlayView onLoad: ', e)
    }, []);
    const unmountCallback = React.useCallback((e) => {
        console.log('OverlayView onUnmount', e)
    }, []);

    // options for InfoWindow or InfoBox not sure
    const options = {closeBoxURL: '', enableEventPropagation: true, pixelOffset: 5};


    return (
        <LoadScript
            googleMapsApiKey={firebaseConfig.apiKey}
        >
            <GoogleMap
                options={defaultMapOptions}
                id='traffic-example'
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={address.position}
            >
                    <NavigateToGoogleMapButton/>


                <OverlayView
                    position={address.position}
                    mapPaneName={overlayPane}
                    onLoad={loadCallback}
                    onUnmount={unmountCallback}
                    getPixelPositionOffset={centerOverlayView}
                >
                    <StyledText
                        style={{
                            color: colorScheme.general.red,
                            fontSize: '10px',
                            position: 'relative',
                            top: -20,
                            left: 70,
                            paddingLeft:'2px',
                            fontWeight:'bold',
                            border: '1px solid yellow',
                            textAlign:'left'
                        }}
                        onClick={clickHandler}
                    >
                        {address.line1} <br/>
                        {address.line2}
                    </StyledText>
                </OverlayView>


                {/*https://react-google-maps-api-docs.netlify.app/#marker*/}
                <Marker position={address.position} />

                {/*
                <InfoWindow
                    position={address.position}
                    options={options}
                >
                    <div style={{backgroundColor: 'yellow', opacity: 0.75, padding: 12, height: '70px'}}>
                        <div style={{fontSize: 16, fontColor: `#08233B`}}>
                            Hello, World!
                        </div>
                    </div>
                </InfoWindow>
                */}
            </GoogleMap>
        </LoadScript>

    )
}
// formatted_address, long_name
//long=x
//lat=y
/*
static
relative
fixed
absolute
sticky
*/

const ExampleOverlayViewPropTypes = {
    styles: PropTypes.shape({
        container: PropTypes.object.isRequired,
    }).isRequired,
};

ShowGoogleMap.propTypes = ExampleOverlayViewPropTypes;

export default React.memo(ShowGoogleMap)