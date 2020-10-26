import React from "react"
import {
    withStyles,
    withWidth,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    container: {
        borderRadius: '1%',
            width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden"
    },
    img: {
        borderRadius: '1%',
        flexShrink: 0,
        maxWidth: '100%',
        maxHeight: '100%',
    }
});

const FeaturedImage = ({classes, theme, width, center, zoom, src, alt}) => {

    return <Paper className={classes.container}><img
        className={classes.img} alt={alt} src={src}/>
    </Paper>

};


FeaturedImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired

};


export default withWidth()(withStyles(styles, {withTheme: true})(FeaturedImage));