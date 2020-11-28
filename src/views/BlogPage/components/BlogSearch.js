import * as React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FeaturedPost from "./FeaturedPost";
import {colorScheme} from "../../../constants";

const useStyles = makeStyles((theme) => ({
    searchResults: {
        fontFamily: 'airbnb-bold',
        color: theme.palette.text.primary,
        marginBottom: theme.spacing(2),
        textAlign: 'left'
    },
    title:{
                fontSize: '25px',
        fontFamily: 'airbnb-black',
        color: theme.palette.text.secondary,
        paddingBottom: theme.spacing(1),
        marginTop: theme.spacing(1)
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',


    },
    noResults: {
        fontFamily: 'airbnb-medium',
        color: theme.palette.text.secondary,
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eceff1',
        boxShadow: "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20)",
        height: 'max(50vh,500px)',
        borderRadius: 2.5,
        marginBottom: theme.spacing(2)

    },
    list: {
        backgroundColor: '#eceff1',
        overflowY: 'scroll',
        borderRadius: 2.5,
        marginBottom: theme.spacing(2),

        minHeight: '50vh',
        height: 'max(50vh,500px)',
        border: '.5px solid rgba(0,0,0,.1)',
        boxShadow: "0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20)"
    }
}));

// [{item:{post}, refIndex: int}]
function BlogSearch({searchList, searchText}) {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Typography component={'h1'} variant={'h4'} className={classes.title}>
                    Search Results
                </Typography>
            </div>

            {searchList.length > 0 ?
                <List component="ul" aria-label="list blog search" className={classes.list}>
                    {
                        searchList.map((searchItem) => {
                            return (
                                <ListItem style={{justifyContent: 'center', alignItems: 'center'}} alignItems="center"
                                          component={'div'} key={searchItem.item.key}>
                                    <FeaturedPost md={10} post={searchItem.item} path={searchItem.item.path}/>
                                </ListItem>
                            )
                        })
                    }

                </List> :
                <Typography variant="h5" className={classes.noResults}>
                    {searchText.length !== 0 ? 'No results :(' : 'Start typing to see results...'}
                </Typography>

            }
        </div>
    );
}


BlogSearch.propTypes = {
    searchList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BlogSearch;
