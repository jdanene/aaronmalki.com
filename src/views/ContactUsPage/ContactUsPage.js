import React, {useContext, useEffect, useState} from "react"
import {firebaseConfig} from "../../App";
import GoogleMapReact from 'google-map-react';
import PropTypes from "prop-types";
import {
    Grid,
    Typography,
    Box,
    IconButton,
    Hidden,
    withStyles,
    withWidth,
    isWidthUp,
    TextField
} from "@material-ui/core";

import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import transitions from "@material-ui/core/styles/transitions";
import {VscLocation} from "react-icons/vsc";
import {BiPhone} from "react-icons/bi";
import {useMediaQuery} from "@material-ui/core";
import ColoredButton from "../../components/Button/ColoredButton";
import {FittedText, StyledText} from "../../components/Text";
import LocationMap from "./LocationMap";
import SendMessage from "./SendMessage";
import Marker from "./Marker";
import Map from "./LocationMap";
import IntroSection from "../../components/intro/Intro"
import ContactSection from '../../components/contact-section/ContactSection'
import MapSection from '../../components/map/Map' // import the map here
import DisclaimerSection from '../../components/disclaimer/Disclaimer'
import FooterSection from '../../components/footer2/Footer'
import MapWithAMakredInfoWindow from "./LocationMap";
import ExampleOverlayView from "./newmap"
import mad2 from "./Marker"
// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const styles = theme => ({
    footerInner: {
        backgroundColor: theme.palette.common.darkBlack,
        paddingTop: theme.spacing(8),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(10),
            paddingLeft: theme.spacing(16),
            paddingRight: theme.spacing(16),
            paddingBottom: theme.spacing(10)
        },
        [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(10),
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            paddingBottom: theme.spacing(10)
        }
    },
    brandText: {
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 400,
        color: theme.palette.common.white
    },
    footerLinks: {
        marginTop: theme.spacing(2.5),
        marginBot: theme.spacing(1.5),
        color: theme.palette.common.white
    },
    infoIcon: {
        color: `${theme.palette.common.white} !important`,
        backgroundColor: "#33383b !important"
    },
    socialIcon: {
        fill: theme.palette.common.white,
        backgroundColor: "#33383b",
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        }
    },
    credential_container: {
        display: 'flex',
        border: '1px solid red',
        height: '40%',
        fontSize: '20px',
        flexDirection: 'row'

    },
    socialIcon_container: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        cursor: "Pointer",
        color: theme.palette.common.white,
        transition: transitions.create(["color"], {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeIn
        }),
        "&:hover": {
            color: theme.palette.primary.light
        }
    },
    whiteBg: {
        backgroundColor: theme.palette.common.white
    },
    credentialsTitle_container: {
        display: "flex",
        flexDirection: "column"
    },
    mapAndForm_container: {
        justifyContent: 'center',
        border: '1px solid blue',
        flexGrow: 1,
        flexShrink: 1,
        marginTop: '90px',
        marginBottom: '45px'
    },

    map_container: {
        border: '1px solid pink',
        flexShrink: 1,
        flexGrow: 1,
        [theme.breakpoints.up("xs")]: {
            height: '500px'
        },
        [theme.breakpoints.up("sm")]: {
            height: '400px'
        },
        [theme.breakpoints.up("md")]: {
            height: '600px'
        },
        [theme.breakpoints.up("lg")]: {
            height: '600px'
        },
        [theme.breakpoints.up("xl")]: {
            height: '600px'
        }
    },
    map_footer: {},
    map_map: {
        height: '75%'
    },
    main_container: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,

    },
    contact_container: {
        display: 'flex',
        width: '100%',
        marginTop: '200px',
        height: '100%',


    },
    credentialname: {
        textAlign: 'left',
        color: theme.palette.common.white,
        border: '1px solid purple',

    },
    address: {
        color: theme.palette.common.white,
        textAlign: 'left',
        border: '1px solid orange',
        width: '100%',
        height: '100%',
        margin: 0,


    },
    address_container: {
        backgroundColor: theme.palette.primary.main,
        border: '1px solid purple',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    email: {
        color: theme.palette.common.white
    },
});

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 37.42216,
  lng: -122.08427,
} // our location object from earlier

const AnyReactComponent = ({text}) => <div>{text}</div>;

    const LOS_ANGELES_CENTER = [37.806279, -122.423516];
const DEFAULT_ZOOM = 13;
const ContactUsPage = ({classes, theme, width, center, zoom}) => {



    return (
        <div className={classes.main_container}>
            <div style={{marginTop:"100px"}}/>

<ExampleOverlayView
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${firebaseConfig.apiKey}&v=3.exp&libraries=geometry,drawing,places`}

  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>


        </div>)

};


//https://github.com/ovieokeh/contact-page-with-google-maps/blob/add-map/src/App.jsx
ContactUsPage.defaultProps = {
    center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 11
};


export default withWidth()(withStyles(styles, {withTheme: true})(ContactUsPage));