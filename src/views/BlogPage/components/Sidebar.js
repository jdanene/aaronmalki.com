import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {FIREBASE_ANALYTICS} from "../../../App";
import {Link} from "react-router-dom";
import getFormattedMonthYear from "../../../components/DateUtils/getFormattedMonthYear";
import {getDateFromTimeStamp} from "../../../components/DateUtils/getMonthYear";
//getDateFromTimeStamp
const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: '#634459',
        fontFamily: 'airbnb-book',
        color: "white",
        textAlign: 'left'
    },
    sidebarSection: {
        marginTop: theme.spacing(0),
        textAlign: 'left',
        color: '#222D32',
        fontFamily: 'airbnb-bold',
    },
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'airbnb-book',
        textAlign: 'left',
        color: theme.palette.secondary.main
    },
    container: {
        marginBottom: theme.spacing(2),
    }
}));

const ABOUTUS =    `A blog about the SF Bay area real estate market, the hottest neighborhoods in The Bay to buy, insights about leasing and navigating pesky tenant laws, general buying and lifestyle tips to keep yourself always in that zen mindset, and my journey providing you with a premier real estate experience. I really hope you enjoy the site! Of course, if there's anything you can feel free to drop me a line, I'll be happy to hear from you (feedback/contributions welcome!).   As always, DON'T PANIC.`;

export default function Sidebar(props) {
    const classes = useStyles();
    const {blogArchivePaths, description, social, title, socialMedia} = props;

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
                <Typography variant="h6" component={'h1'} gutterBottom style={{fontFamily: 'airbnb-bold', fontSize:20}}>
                    A Hitchhiker's Guide to The Bay
                </Typography>
                <Typography variant={'caption'} component={'span'} style={{fontSize:14}}>{ABOUTUS}</Typography>
            </Paper>

          <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Archives
            </Typography>

            { Object.keys(blogArchivePaths).sort().map((dateTimeStamp) => {
                let monthYear = getFormattedMonthYear(getDateFromTimeStamp(dateTimeStamp));
                return <Link className={classes.listItem} display="block" variant="body1"
                             to={{pathname:blogArchivePaths[dateTimeStamp]}} key={dateTimeStamp}>
                    {monthYear}
                </Link>
            })}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Social
            </Typography>
            {social.map((network) => (
                <Link onClick={() => handleSocialIconClick(network.key, socialMedia[network.key])}
                      className={classes.listItem} display="block" variant="body1" to={socialMedia[network.key]}
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