import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {getKeyFromSingelton} from "../../../context/useBlogPost";
import {colorScheme} from "../../../constants";
import ButtonBase from '@material-ui/core/ButtonBase';
import clsx from "clsx";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(3),

        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),

        },


        '&:hover, &$focusVisible': {
            backgroundColor: 'rgba(0,0,0,.2)',
            transition: theme.transitions.create('backgroundColor'),

            '& $imageTitle': {
                border: '4px solid currentColor',
                textDecoration: 'underline',

            },
        },
    },
    focusVisible: {},
    imageTitle: {
      border: '4px solid rgba(0,0,0,0)',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {

        backgroundColor: 'rgba(0,0,0,.35)',
        transition: theme.transitions.create('opacity'),
    },
    featureLinkText: {
        color: 'white',
        fontFamily: 'airbnb-bold',
        //textShadow: '0.05em 0 black,0 0.05em black,-0.05em 0 black,0 -0.05em black,-0.05em -0.05em black,-0.05em 0.05em black,0.05em -0.05em black,0.05em 0.05em black',
        letterSpacing: '.3px',

        // container
        marginTop: 25,

    },

}));


function MainFeaturedPost(props) {
    const classes = useStyles();
    let {post, path} = props;
    let postActual = post[getKeyFromSingelton(post)];
    const history = useHistory();

    return (
        <Paper
            className={classes.mainFeaturedPost}
            style={{backgroundImage: `url(${postActual.image})`}}
        >
            {/* Increase the priority of the hero background image */}
            {
                <img
                    style={{display: 'none'}}
                    src={postActual.image}
                    alt={postActual.imageText}
                />
            }

            <div className={classes.overlay}/>
            <Grid container direction={'column'}>
                <Grid item md={6}>
                    <ButtonBase
                        onClick={()=>history.push(path)}
                        focusVisibleClassName={classes.focusVisible}
                        className={clsx(classes.mainFeaturedPostContent, classes.imageMarked)}>
                        <Typography
                            component="h1"
                            variant="h3"
                            color="inherit"
                            gutterBottom

                            /*style={{border:'1px solid white'}}*/
                        >
                            {postActual.title}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {postActual.description}
                        </Typography>
                        <div >
                            <Typography variant="subtitle1" href={path}
                                  className={clsx(classes.imageTitle, classes.featureLinkText)}>
                                Continue reading . . .
                            </Typography>
                        </div>
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    );
}

MainFeaturedPost.propTypes = {
    post: PropTypes.shape({
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageText: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default MainFeaturedPost;
