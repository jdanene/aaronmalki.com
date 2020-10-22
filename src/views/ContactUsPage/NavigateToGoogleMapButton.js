import React, {useCallback, useState, useContext, useEffect} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import {AppContext} from "../../context";
import CardActionArea from '@material-ui/core/CardActionArea';
import {GrDirections} from "react-icons/gr";
import {StyledText} from "../../components/Text";
import {colorScheme} from "../../constants";
import {IconContext} from "react-icons";
import {FaDirections} from "react-icons/fa";
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
    container: {
        position: "relative",
        left: 0,
        top: 0,
        maxWidth: 345,
        maxHeight: 200
    },
    directionButton: {
        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent", color: colorScheme.general.other_blue
        }
    },
    directionIcon:{
        color: colorScheme.general.light_blue0,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
           color: colorScheme.general.other_blue
        }
    },
    largerMapButton:{
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
                    <Typography gutterBottom variant="h5" component="h5">
                        {address.line1}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {address.line1} <br/>
                        {address.line2} <br/>
                        {phoneNumber.dot} <br/>
                        {email}
                    </Typography>
                </CardContent>

                <Button size="small" disableRipple className={classes.directionButton}>
                <Tooltip title="Get directions on Google Map" >

                    <div style={{flexDirection: 'column', display: 'flex'}}>

                            <div aria-label="direction"  >
                                <FaDirections size={32} />
                            </div>


                        <StyledText>
                            Directions
                        </StyledText>
                    </div>
                                    </Tooltip>

                </Button>
            </div>

            <CardActions>
                <Button size="small" className={classes.largerMapButton}>
                    View Larger Map
                </Button>

            </CardActions>
        </Card>

    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(NavigateToGoogleMapButton));