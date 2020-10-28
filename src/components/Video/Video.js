import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ReactPlayer from 'react-player/lazy'
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        overflow: "hidden",
        borderRadius: '1%',

        width: '100%',
        height: '100%',
        [theme.breakpoints.up("sm")]: {
            maxWidth: 500,
            maxHeight: 500
        }

    },
    video: {
        borderRadius: '1%',

    }
}));

const Video = ({url = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'}) => {
    const classes = useStyles();
    const [ready, setReady] = useState(false);
    let options = {};
    let style = {}
    if (url.includes("www.facebook.com")) {
        options.height = "100%";
        options.width = "100%";
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            {!ready ? <Skeleton variant="rect" component={"video"}>
                    <div style={style} className={classes.root}>
                        <ReactPlayer style={{radius:"1%"}} onReady={() => setReady(true)}  {...options} className={classes.video} url={url}
                                     playing={false} loop={true} controls={true}/>


                    </div>
                </Skeleton> :
                <div style={style} className={classes.root}>
                    <ReactPlayer style={{radius:"1%"}} onReady={() => setReady(true)}  {...options} className={classes.video} url={url}
                                 playing={false} loop={true} controls={true}/>

                </div>
            }
        </div>
    )
};


export default Video

