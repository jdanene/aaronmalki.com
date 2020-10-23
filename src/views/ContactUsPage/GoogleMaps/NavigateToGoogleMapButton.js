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
        display: 'flex',
        padding: 0,
        marginRight: 5,
        marginTop: 5,
        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent", color: colorScheme.general.other_blue
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
        fontSize: 12

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
const NavigateToGoogleMapButton = ({classes, theme, width, center, zoom}) => {
    const {address, phoneNumber, email} = useContext(AppContext);


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

                        <a href="#" className={classes.largerMapButton}>
                            View Larger Map
                        </a>

                    </div>

                    <div className={classes.directionButton}>
                        <div aria-label="direction">
                            <FaDirections size={24}/>
                        </div>

                        <StyledText className={classes.directionText}>
                            Directions
                        </StyledText>
                    </div>

                </div>

            </CardContent>


        </Card>

    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(NavigateToGoogleMapButton));