import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReactPlayer from 'react-player/lazy'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: '1%',
        width: '100%',

    },
    video: {
        borderRadius: '1%',

    }
}));

const Video = ({url='https://www.youtube.com/watch?v=ysz5S6PUM-U'}) => {
    const classes = useStyles();

    let options = {};
    let style = {}
    if (url.includes("www.facebook.com")){
        options.height = "100%";
        options.width = "100%";
        style.maxHeight = "600 !important"
        style.maxWidth = "600 !important"
    }

    return (
        <div style={{display:'flex', alignItems:'center',justifyContent:'center',width:'100%'}}>
        <div style={style}  className={classes.root}>
            <ReactPlayer   {...options}         className={classes.video} url={url} playing={false} loop={true} controls={true} />
        </div>
        </div>
    )
};


export default Video

