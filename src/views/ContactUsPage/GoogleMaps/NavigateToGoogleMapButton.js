import React, {useCallback, useState, useContext, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {
    withStyles,
    withWidth,
} from "@material-ui/core";

import {AppContext} from "../../../context";
import {StyledText} from "../../../components/Text";
import {colorScheme} from "../../../constants";
import {FaDirections} from "react-icons/fa";
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
    container: {
        position: "relative",
        left: 5,
        top: 5,
        maxWidth: 300,
        maxHeight: 200
    },
    directionButton: {
        padding:0,
        display:'flex',
        border: '1px solid yellow',
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
        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            color: colorScheme.general.other_blue
        }
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


            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CardContent>
                    <StyledText gutterBottom variant="h5" component="h5"
                                style={{textAlign: 'left', fontWeight: 'bold', fontSize: 16}}>
                        {address.line1}
                    </StyledText>
                    <StyledText variant="body2" color="textSecondary" component="p" style={{textAlign: 'left'}}>
                        {address.line1} <br/>
                        {address.line2} <br/>
                    </StyledText>
                </CardContent>

                <Button size="small" disableRipple className={classes.directionButton}>
                    <Tooltip title="Get directions on Google Map">

                        <div style={{flexDirection: 'column', display: 'flex'}}>

                            <div aria-label="direction">
                                <FaDirections size={24}/>
                            </div>


                            <StyledText>
                                Directions
                            </StyledText>
                        </div>
                    </Tooltip>

                </Button>
            </div>

            <Button style={{float: 'left', marginLeft: 3}} size="small" className={classes.largerMapButton}>
                View Larger Map
            </Button>

        </Card>

    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(NavigateToGoogleMapButton));