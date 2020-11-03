import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
//https://www.dreamstime.com/illustration/couple-buying-house.html

import Button from '@material-ui/core/Button';
import {colorScheme} from "../../../constants";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width:300,
        justifyContent: 'space-between',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:theme.spacing(1)
    },
    content: {
        flex: '1 0 auto',

    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const DashboardOption = ({img, title, color, href='#'}) => {
    const classes = useStyles();
    const theme = useTheme();

    console.log(href)
    return (
        <Grid item xm={12} sm={6} md={5} style={{alignItems:'center', justifyContent:'center', display:'flex'}}>
            <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            {title}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Button href={href} variant="contained" size="medium"
                                style={{backgroundColor:color, color: 'white'}}
                                className={classes.margin}>
                            Manage
                        </Button>
                    </div>
                </div>
                <CardMedia
                    className={classes.cover}
                    image={img}
                    title="Live from space album cover"
                />
            </Card>
        </Grid>
    );
}

export default DashboardOption;