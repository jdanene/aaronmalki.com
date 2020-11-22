import React from 'react'
import {GoogleMap, LoadScript, Marker, OverlayView} from '@react-google-maps/api'
import {StyledText} from "../../../components/Text";
import NavigateToGoogleMapButton from "./NavigateToGoogleMapButton";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

const centerOverlayView = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
});

const mapContainerStyle = {
    height: "100%",
    width: "100%",
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    padding:0,
    display:'flex'
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
    clickableIcons:false
};

const ShowGoogleMap = ({phoneNumber, email, address}) => {


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
            googleMapsApiKey={API_KEY}
        >
            <GoogleMap
                options={defaultMapOptions}
                id='traffic-example'
                mapContainerStyle={mapContainerStyle}
                zoom={13}
                center={{lat:address.position.lat,lng:address.position.lng }}
            >


                    <NavigateToGoogleMapButton address={address}/>


                <OverlayView
                    position={address.position}
                    mapPaneName={overlayPane}
                    onLoad={loadCallback}
                    onUnmount={unmountCallback}
                    getPixelPositionOffset={centerOverlayView}
                >
                    <StyledText
                        style={{
                            color: "#DD4B3E",
                            fontSize: '12px',
                            position: 'relative',
                            top: -20,
                            left: 85,
                            paddingLeft:'2px',
                            fontWeight:'bold',
                            textAlign:'left',
                            textShadow: "-1px -1px 3px white, 1px 1px 0px white, -1px 1px 0px white, 1px 1px 0px white,1px 1px 0px white,-2px 0px 0px white,2px 0px 0px white,0px 2px 0px white,0px -2px 0px white"
                        }}
                        /*onClick={clickHandler}*/
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


export default React.memo(ShowGoogleMap)