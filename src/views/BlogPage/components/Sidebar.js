import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {colorScheme} from "../../../constants";
import {AppContext} from "../../../context";
import {FIREBASE_ANALYTICS} from "../../../App";

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: '#634459',
        fontFamily: 'airbnb-book',
        color: "white",
        textAlign: 'left'
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
        textAlign: 'left',
        color: '#222D32',
        fontFamily: 'airbnb-bold',
    },
    listItem: {
        fontFamily: 'airbnb-book',
        textAlign: 'left'
    },
    container: {
        marginBottom: theme.spacing(2),
    }
}));

export default function Sidebar(props) {
    const classes = useStyles();
    const {archives, description, social, title, socialMedia} = props;

    const handleSocialIconClick = (name, path) => {
        FIREBASE_ANALYTICS.logEvent('select_content', {
            content_type: 'socialMedia',
            content_id: `${name}:blog`,
            items: [{path}]
        });

    };

    return (
        <Grid item xs={12} md={4} className={classes.container}>
            <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom style={{fontFamily: 'airbnb-bold'}}>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
            </Paper>
            {/*
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Archives
      </Typography>
      {archives.map((archive) => (
        <Link className={classes.listItem}  display="block" variant="body1" href={archive.url} key={archive.title}>
          {archive.title}
        </Link>
      ))}*/}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Social
            </Typography>
            {social.map((network) => (
                <Link onClick={() => handleSocialIconClick(network.key, socialMedia[network.key])}
                      className={classes.listItem} display="block" variant="body1" href={socialMedia[network.key]}
                      key={network.key}>
                    <Grid container direction="row" spacing={1} alignItems="center">
                        <Grid item>
                            <network.icon/>
                        </Grid>
                        <Grid item>{network.name}</Grid>
                    </Grid>
                </Link>
            ))}
        </Grid>
    );
}

Sidebar.propTypes = {
    archives: PropTypes.array,
    description: PropTypes.string,
    social: PropTypes.array,
    title: PropTypes.string,
};