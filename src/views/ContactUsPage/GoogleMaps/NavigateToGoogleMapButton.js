import React, {useCallback, useState, useContext, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {
    withStyles,
    withWidth,
} from "@material-ui/core";

import {AppContext} from "../../../context";
import {FittedText, StyledText} from "../../../components/Text";
import {colorScheme} from "../../../constants";
import {FaDirections} from "react-icons/fa";
import Tooltip from '@material-ui/core/Tooltip';
import Link from "@material-ui/core/Link";

const styles = theme => ({
    container: {
        position: "relative",
        left: 5,
        top: 5,
        width: 230,
        height: 90


    },
    addressHeader: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14


    },
    addressMain: {
        textAlign: 'left',
        fontSize: 12

    },
    directionButton: {
        flexDirection: 'column',
        textDecoration: "none",
        display: 'flex',
        padding: 0,
        marginRight: 5,
        marginTop: 5,
        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent", color: colorScheme.general.other_blue, textDecoration: "underline",
        }
    },
    directionIcon: {

        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            color: colorScheme.general.other_blue
        }
    },
    largerMapButton: {
        textDecoration: 'none',
        textAlign: 'left',
        marginLeft: 5,
        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            color: colorScheme.general.other_blue,
            textDecoration: "underline"
        },
        fontSize: 13

    },
    directionText: {
        fontSize: 12,
    }
});

/*
*             address: {
                line1: "891 Beech Street",
                line2: "San Francisco CA 94109",
                position:
                    {
                        lat: 37.806279,
                        lng: -122.423516
                    }
            },
            phoneNumber: {
                dash: "(909) 771-6881",
                dot: "909.771.6881"
            },
            email: "aaronmalki@malki.com"
        };
*
* */

//https://developers.google.com/maps/documentation/urls/get-started
//Search — launch a Google Map that displays a pin for a specific place, or perform a general search and launch a map to display the results:
//https://www.google.com/maps/search/?api=1&query_place_id=ChIJGYoj1CSq3IAR4O_Npf_PZTY
//Directions — request directions and launch Google Maps with the results:
//https://www.google.com/maps/dir/?api=1&parameters
/*
                    {
                        lat: 37.806279,
                        lng: -122.423516
                    }

*/

const NavigateToGoogleMapButton = ({classes, address, theme, width, center, zoom}) => {

    const [googleMapsUrls, setGoogleMapsUrl] = useState({searchUrl: "#", directionUrl: "#"});

    useEffect(() => {

        // https://developers.google.com/maps/documentation/urls/get-started
        if ((address) && "position" in address) {
            const {lat, lng, place_id} = address.position;
            let searchUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${place_id}`;
            let directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${place_id}`;

            setGoogleMapsUrl({searchUrl, directionUrl});
        }

    }, [address]);


    return (
        <Card className={classes.container}>


            <CardContent style={{padding: 0, margin: 0, height: '100%'}}>

                <div style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>

                    <div style={{display: "flex", flexDirection: 'column', justifyContent: 'space-between'}}>

                        <div style={{display: "flex", flexDirection: 'column', marginLeft: 5, marginTop: 5}}>

                            <StyledText className={classes.addressHeader}>
                                {address.line1}
                            </StyledText>

                            <StyledText className={classes.addressMain}>
                                {address.line1} <br/>
                                {address.line2}
                            </StyledText>
                        </div>


                        <Link className={classes.largerMapButton} href={googleMapsUrls.searchUrl}>
                            View Larger Map
                        </Link>

                    </div>

                    <Link className={classes.directionButton} href={googleMapsUrls.directionUrl}>
                        <div aria-label="direction">
                            <FaDirections size={24}/>
                        </div>

                        <StyledText className={classes.directionText}>
                            Directions
                        </StyledText>
                    </Link>

                </div>

            </CardContent>


        </Card>

    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(NavigateToGoogleMapButton));