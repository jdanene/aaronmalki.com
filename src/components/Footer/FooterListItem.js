import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {colorScheme, pageToPathName} from "../../constants";
import {Link} from "react-router-dom";
import "./Footer.scss";
import {
    pageToPageName as adminPageToPageName,
    pageToPathName as adminPageToPathName
} from "views-protected/protected-views"
import {AppContext} from "../../context";
import {Divider} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                aaronmalki.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));


const footer = [

    {
        title: 'Resources',
        description: [['Home', 'HomePage'],['Buy', 'BuyersPage'], ['Lease', 'LeasePage'], ['Blog', "BlogPage"], ['Contact Us', 'ContactUsPage']],
    }
];

/*
const useStyles = makeStyles({
    icon_container: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "rgba(112, 134, 144,.15)",
            boxShadow: '0 1.5px 3.5px rgba(0,0,0,0.12), 0 1.5px 2.5px rgba(0,0,0,0.24)'

        },

            //you want this to be the same as the backgroundColor above
            color: "#0e76a8",
            backgroundColor: "rgba(112, 134, 144,.1)",
              boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'

    },

    icon: {
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent",
        },
        backgroundColor: "transparent",
        position: "absolute",
        top:7.9,
        left:7.9
    }

});
*/

export default function FooterListItem() {
    const {auth} = useContext(AppContext);
    const classes = useStyles();

    return (

        <Grid item xs={12} sm={12} md={4} lg={3} key={footer[0].title}>
            <div style={{width: '100%', borderTop: `1px solid ${colorScheme.primary.primary}`, marginBottom: '10px'}}>
            </div>
            {/*
            <Typography variant="h6" style={{color:colorScheme.primary.dark}} gutterBottom>
                {footer[0].title}
            </Typography>
            */}

            <ul>
                {footer[0].description.map((item) => (
                    <li key={item[1]}>
                        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <Link to={pageToPathName[item[1]]} className={"footer_link"}>
                                {item[0]}
                            </Link>
                        </div>
                    </li>
                ))}


                {auth.user &&
                <React.Fragment>
                    <li key={adminPageToPageName['AdminPage']}>
                        <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                            <Link to={adminPageToPathName['AdminPage']} className={"footer_link"} style={{color:colorScheme.general.hot_purple}}>
                                {adminPageToPageName['AdminPage']}
                            </Link>
                        </div>
                    </li>
                </React.Fragment>

                }

            </ul>
        </Grid>


    )
}

